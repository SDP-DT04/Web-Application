var SerialPort = require('serialport')
var DP = require('./data-processor.js')
var db = require('./database.js')

var PORT_M = 'Arduino__www.arduino.cc_'

var Xbee = function () {};
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
          parser: SerialPort.parsers.readline('\r\n')
        });

        port.on('open', function() {
          console.log('serial port open and ready to receive data');
        });

        port.on('error', function() {
          console.log('error opening serial port!');
        });

        port.on('data', function(data) {
          handle_new_data(data);
        });
      }
    });
  });
}

/**
 * States for data acquisition
 */
State = {
  IDLE: 0,
  RFID: 1,
  WEIGHT: 2,
  TIME: 3,
  ACCEL: 4,
};

var _dataObj = {};
_state = State.IDLE;
_data = [];
/**
 * Callback for handing a new data value
 */
function handle_new_data(data)
{
  switch (_state)
  {
    case State.IDLE:
    {
      if (data == 21076)
      {
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
        _dataObj.date = new Date().toISOString();
        _state++;
        console.log('starting');
        break;
      }
    }
    case State.RFID:
    {
      _dataObj.rfid_tag = data;
      _state++;
      break;
    }
    case State.WEIGHT:
    {
      _dataObj.weight = data;
      _state++;
      break;
    }
    case State.TIME:
    {
      _dataObj.tot_time = data;
      _state++;
      break;
    }
    case State.ACCEL:
    {
      if (data == 20304)
      {
        _state++;
        store();
        break;
      }
      _data.push(data);
      break;
    }
  }
}

/**
 *  Create a JSON object and store it to the database
 */
function store()
{
  console.log('storing: ');
  console.log(_dataObj);

  DP.process_dataset(_data, function(data) {
    _dataObj.coefficients = data.coefficients;
    _dataObj.max_force = (data.wall_accel * _dataObj.weight) / 9.8;
    _dataObj.distance = data.distance;

    db.data.save(_dataObj);

    console.log(_dataObj);
  });
}

module.exports = new Xbee();
