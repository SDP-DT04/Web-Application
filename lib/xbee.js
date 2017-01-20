var SerialPort = require('serialport')

var Xbee = function () {};

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
    console.log('received new data: ' + data);
  });
}
module.exports = Xbee;
