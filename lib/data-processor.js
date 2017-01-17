fs = require('fs');
math = require('mathjs');

var Proc = function () {};
var FILE_PATH = 'data/595_2.txt';

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
//		console.log(position)
		coeff = polyfit(time, position, 10);

		for (t = time[0]; t < time[time.length-1]; t += 0.1)
		{
			console.log(polyval(t, coeff));
		}
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

function polyfit(x, y, n)
{
	// generate X matrix
	X = math.zeros(x.length, n+1);
	for (i=0; i<x.length; ++i)
	{
		for (j=0; j<=n; ++j)
		{
			X.subset(math.index(i, j), Math.pow(x[i], n-j));
		}
	}

	// solve for the coefficients
	XT = math.transpose(X);
	A = math.multiply(XT, X);
	B = math.multiply(XT, y);
	alpha = math.divide(B, A);

	// generate array from matrix and return
	coeff = [];
	for (i=0; i<n+1; ++i)
	{
		coeff.push(alpha.subset(math.index(i)));
	}
	return coeff;
}

function polyval(val, coeff)
{
	sum = 0;
	for (i=0; i < coeff.length; ++i)
	{
		sum += (coeff[i] * Math.pow(val, (coeff.length-1) - i));
	}
	return sum;
}

module.exports = Proc;
