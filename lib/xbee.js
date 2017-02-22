var SerialPort = require('serialport')
var DP = require('./data-processor.js')
var db = require('./database.js')
var xbee_api = require('xbee-api')

var PORT_M = 'Arduino__www.arduino.cc_'

var Xbee = function () {};
var _data = [];

var xbeeAPI = new xbee_api.XBeeAPI({
  api_mode: 1
});

var _dataObj = {};

var _data = [];

/**
 * Kicks off Xbee communication by finding and opening the correct port.
 * Begins waiting for data
 */
Xbee.prototype.start = function()
{
  SerialPort.list(function(err, ports) {
    ports.forEach(function(p) {
      if (p.manufacturer == PORT_M)
      {
        console.log("opening port " + p.comName);

        port = new SerialPort(p.comName , {
          baudrate: 9600,
          parser: xbeeAPI.rawParser()
        });

        port.on('open', function() {
          console.log('serial port open and ready to receive data');
        });

        port.on('error', function() {
          console.log('error opening serial port!');
        });

        // port.on('data', function(data) {
        //   handle_new_data(data);
        // });
        xbeeAPI.on("frame_object", function(frame) {
         //console.log(">>", frame);
          if (frame.data.length > 0) {
            frameId = frame.data[0];
            switch(frameId) {
              case 0: {
                console.log("initializing");
                _dataObj = {
                  rfid_tag : 0,
                  date : 0,
                  weight : 0,
                  tot_time : 0,
                  distance : 0,
                  max_force : 0,
                  coefficients : [],
                  swimmer : 0
                };

                _data = [];
                break;
              }
              case 1: {
                handleRfid(frame.data);
                break;
              }
              case 2: {
                handleWeight(frame.data);
                break;
              }
              case 3: {
                handleAccel(frame.data);
                break;
              }
            }
          }
        })
      }
    });
  });
}

function handleRfid(data)
{
  // console.log("rfid: ");
  str = "";
  // console.log("new rfid data:");
  for (i=2; i<data.length; ++i)
  {
    if (data[i] == 0x0D || data[i] == 0x0A || data[i] == 0x03);
    else {
        str += String.fromCharCode(data[i]);
    }

    // if (data[i] < 16) {
    //   str += '0' + data[i].toString();
    // }
    // else {
    //   str += data[i].toString();
    // }
  }
  // console.log(str);
  _dataObj.rfid_tag = str;
}

function handleWeight(data)
{
  // console.log("new weight:");
  // console.log(data[1]);
  _dataObj.weight = data[1];
}

function handleAccel(data)
{
  // console.log("new accel");
  if (data.length == 1) {
     store()
  }

str = "";
  for (i=0; i<data.length-1; i+=2) {
    d = (data[i]<<8) | data[i+1];
    d = d / 1000;
    // str += d;
    // str += " ";
    // console.log(d);
    if (d != 0)
    {
      _data.push(d);
    }
  }
  // console.log(str);
}






/**
 *  Create a JSON object and store it to the database
 */
function store()
{
  console.log('storing: ');

  DP.process_dataset(_data, function(data) {
    _dataObj.coefficients = data.coefficients;
    _dataObj.max_force = (data.wall_accel * _dataObj.weight) / 9.8;
    _dataObj.distance = data.distance;
    _dataObj.tot_time = data.time;
    _dataObj.date = (new Date()).toString();
    db.workouts.save(_dataObj);

    console.log(_dataObj);
  });
}

module.exports = new Xbee();
