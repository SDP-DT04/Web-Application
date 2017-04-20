var SerialPort = require('serialport')
var DP = require('./data-processor.js')
var db = require('./database.js')
var xbee_api = require('xbee-api')

var PORT_M = 'FTDI'

var Xbee = function () {};
var _data = [];

var xbeeAPI = new xbee_api.XBeeAPI({
  api_mode: 1
});

var _data = [];

var _dataObj = {
  rfid_tag : 0,
  date : 0,
  dateString : "",
  weight : 0,
  tot_time : 0,
  distance : 0,
  max_force : 0,
  coefficients : [],
  swimmer : 0
};

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
          baudrate: 115200,
          parser: xbeeAPI.rawParser()
        });

        port.on('open', function() {
          console.log('serial port open and ready to receive data');
        });

        port.on('error', function() {
          console.log('error opening serial port!');
        });

        xbeeAPI.on("frame_object", function(frame) {
          
	if (frame.data.length > 0) {
            frameId = frame.data[0];
            switch(frameId) {
              case 0: {
                console.log("initializing");
                _dataObj = {
                  rfid_tag : 0,
                  date : 0,
                  dateString : "",
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
  out = "";
//  console.log("new rfid data:");
  out += "{\"rfid_tag\" : \"";
  for (i=3; i<data.length-2; ++i)
  {
    //str += data[i];
    str += String.fromCharCode(data[i]);
  }
  out += parseInt(str, 16);
   out += "\"}";
  _dataObj.rfid_tag = parseInt(str, 16);
 // console.log(_dataObj.rfid_tag); 
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
  if (data.length == 2) {
     store()
  }

  for (i=1; i < data.length; i+=2)
  {
    data[i+1] &= 0b00111111;
    accel = (data[i+1] << 8) | data[i];
    if (accel > 8192)
      accel -= 16384;

    accel /= 4096;
    accel *= 9.80665;
    _data.push(accel);
  }
}

function getDateString(date)
{
  // create date string
  str = "";
  if ( date.getMonth()+1 < 10)
    str += "0";
  str += date.getMonth()+1;
  str += "/";
  if ( date.getDate() < 10 )
    str += "0";
  str += date.getDate();
  str += "/";
  str += date.getFullYear();
  str += " ";

  // create time string
  if ( date.getHours() < 10)
    str += "0";
  str += date.getHours();
  str += ":";
  if ( date.getMinutes() < 10)
    str += "0";
  str += date.getMinutes();
  str += ":";
  if (date.getSeconds() < 10)
    str += "0";
  str += date.getSeconds();

  return str;
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
    _dataObj.date = (new Date());
    _dataObj.dateString = getDateString(_dataObj.date);

    db.swimmers.findOne({rfid_tag: _dataObj.rfid_tag}, function(err, swimmer) {
      if(swimmer) {
        console.log(_dataObj.rfid_tag);
        console.log(swimmer);
        _dataObj.swimmer = swimmer.name
      }
      else {
        _dataObj.swimmer = "Not Assigned";
      }

      db.workouts.save(_dataObj);
      db.recent_workouts.save(_dataObj);
      console.log(_dataObj);
    });
  });
}

module.exports = new Xbee();
