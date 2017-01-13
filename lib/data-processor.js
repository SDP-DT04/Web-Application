fs = require('fs');

var Proc = function () {};
var FILE_PATH = 'data/data.txt';

Proc.prototype.process_dataset = function () {
	fs.readFile(FILE_PATH, 'utf8', function(err, data) {
		if (err) {
			// there was some error opening the file
			return console.log(err);
		}

		// split the data into time and acceleration arrays
		dataParts = data.split('\n');
		time = dataParts.map(function(s) {return parseFloat(s.split(',')[0])});
		accel = dataParts.map(function(s) {return parseFloat(s.split(',')[1])});
		time = time.slice(0, -1);
		accel = accel.slice(0, -1);

		// determine the start and stop times and slice the array
	});
};

module.exports = Proc;
