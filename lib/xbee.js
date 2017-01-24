var SerialPort = require('serialport')
var DP = require('data-processor.js')

var Xbee = function () {};
var _data;

Xbee.prototype.start = function()
{
  var port = new SerialPort('/dev/ttyACM1', {
    parser: SerialPort.parsers.readline('\n')
  });

  port.on('open', function() {
    console.log('Serial port open and ready to receive data');
  });

  port.on('error', function() {
    console.log('error opening serial port');
  });

  port.on('data', function(data) {
    //console.log('received new data: ' + data);

    if (data == 'START')
    {
      // initialize an empty array for the data
      _data = [];
      return;
    }
    else if (data == 'STOP')
    {
      dp = new DP();
      dp.process_dataset(_data);
    }
    // append the new data
    _data.push(data);
  });
}
module.exports = Xbee;
