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
		data = extract_swim_data(time, accel);
	});
};

function extract_swim_data(time, accel)
{
	isSwimming = false;
	NUM_SAMPLES = 25;
	avg = 0;
	stdev = 0;
	startIndex = 0;
	stopIndex = accel[accel.length-1];
	// iterate over entire data set
	for (i=0; i < accel.length - NUM_SAMPLES; ++i)
	{
		// get the average of this window of data
		for (j=i; j<i+NUM_SAMPLES; ++j)
		{
			avg += accel[j];
		}
		avg = avg / NUM_SAMPLES;

		// get the variance of this window of data
		for (j=i; j<i+NUM_SAMPLES; j++)
		{
			stdev += (accel[j]-avg) * (accel[j]-avg);
		}
		stdev = stdev / NUM_SAMPLES;
		console.log(stdev);
		if (isSwimming == false && stdev > 2)
		{
			console.log('detected start time: ' + time[i]);
			startIndex = i;
			isSwimming = true;
		}
		else if (isSwimming == true && stdev < 0.2)
		{
			console.log('detected stop time: ' + time[i]);
			stopIndex = i;
			//break;
		}
	}

	// trim arrays to match the the times when the swimmer is active
	time = time.slice(startIndex, startIndex);
	accel = accel.slice(startIndex, stopIndex);
	return[time, accel];
}

module.exports = Proc;
