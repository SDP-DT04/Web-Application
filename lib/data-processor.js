fs = require('fs');

var Proc = function () {};
var FILE_PATH = 'data/298_1.txt';

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
		// console.log(accel);
		// determine the start and stop times and slice the array
		data = extract_swim_data(time, accel);
		time = data[0];
		accel = data[1];
		//console.log(accel);
		// filter the acceleration
		accel = filter(accel);
		// the first two values are zero, so chop them off
		accel = accel.slice(2);
		time = time.slice(2);

		// center the acceleration
		accel = center(accel);

		// perform midpoint integration
		position = midpoint(midpoint(accel, time), time);
		console.log(position)

	});
};

function extract_swim_data(time, accel)
{
	isSwimming = false;
	NUM_SAMPLES = 50;
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
		//console.log(stdev + ", " + i );
		if (isSwimming == false && stdev > 0.5)
		{
			console.log('detected start time: ' + i);
			startIndex = i;
			isSwimming = true;
		}
		else if (isSwimming == true && stdev < 0.07)
		{
			console.log('detected stop time: ' + i);
			stopIndex = i + NUM_SAMPLES;
			break;
		}
	}

	// trim arrays to match the the times when the swimmer is active
	time = time.slice(startIndex, stopIndex);
	accel = accel.slice(startIndex, stopIndex);

	return[time, accel];
}

function filter(x)
{
	// array to hold the filtered output
	y = [];
	y.push(0);
	y.push(0);

	for (k = 2; k < accel.length; ++k)
	{
		y.push(0.2928932 *x[k] + 0.5857864*x[k-1] + 0.2928932*x[k-2] - 0.17157287*y[k-2]);
	}
	return y;
}

function center(x)
{
	sum = x.reduce(function(a,b) {return a+b;});
	avg = sum / x.length;

	x = x.map(function(s) {return s - avg});

	return x;
}

function midpoint(x, t)
{
	// array to hold the integral
	y = [];
	y.push(0);

	for (i = 1; i < x.length; ++i)
	{
		dt = t[i] - t[i-1];

		midVal = (x[i] + x[i-1]) / 2;
		y.push(y[i-1] + dt*midVal);
		//console.log(y[i-1]);
	}
	return y;
}

module.exports = Proc;
