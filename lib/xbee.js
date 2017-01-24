var SerialPort = require('serialport')
var DP = require('./data-processor.js')

var Xbee = function () {};
var _data = [];

Xbee.prototype.start = function()
{
  var port = new SerialPort('/dev/ttyACM0', {
    parser: SerialPort.parsers.readline('\n')
  });

  port.on('open', function() {
    console.log('Serial port open and ready to receive data');
  });

  port.on('error', function() {
    console.log('error opening serial port');
  });

  port.on('data', function(data) {

    //if (data == 21514)
    //{
	//	console.log('Start!'); 
      // initialize an empty array for the data
    //  _data = [];
    //  return;
   // }
    if (data == 28528)
    {
	  console.log('Stop!'); 
      dp = new DP();
      dp.process_dataset(_data);
    }
    // append the new data
	if (data < 20)
	{
    	_data.push(data);
    	console.log('received new data: ' + data);
	}
  });
}
module.exports = Xbee;
