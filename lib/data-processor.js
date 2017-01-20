fs = require('fs');
math = require('mathjs');

var Proc = function () {};	// object to hold module functions

/*
 * Constants
 */
var DATA_FILE_PATH = 'data/298_1.txt';	// relative path of data file to use

/**
 *	Does everthing needed to process accelerometer data, including truncation,
 * 	filtering, integration, and polynomial approximation
 */
Proc.prototype.process_dataset = function (callback) {
	fs.readFile(DATA_FILE_PATH, 'utf8', function(err, data) {
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
		time = data[0];
		accel = data[1];
	
		console.log(accel.length); 	
		console.log(accel);
		
		// filter the acceleration
		accel = filter(accel);
		// the first two values are zero, so chop them off
		accel = accel.slice(2);
		time = time.slice(2);

		// center the acceleration
		accel = center(accel);

		// perform midpoint integration; get swimmer position
		position = midpoint(midpoint(accel, time), time);
		position = apply_bucket_relationship(position);

		//console.log(position[position.length-1]);
		// find coefficient to fit the position curve to a polynomial
		coeff = polyfit(time, position, 10);
		//expand_position(time[0], time[time.length-1], 0.1, coeff)
		//console.log(expand_accel(time[0], time[time.length-1], 0.1, coeff));

		// execute the callback function
		//callback(coeff);
	});
};

/**
 *	Expands a polynomial curve based on a start, stop, and step values
 */
function expand_position(start, stop, step, coeff)
{
	result = [];
	for (t=start; t<stop; t+=step)
	{
			result.push(polyval(t, coeff, 'p'));
	}
	return result;
}

/**
 *	Expands a polynomial curve based on a start, stop, and step values
 */
function expand_velocity(start, stop, step, coeff)
{
	result = [];
	for (t=start; t<stop; t+=step)
	{
			result.push(polyval(t, coeff, 'v'));
	}
	return result;
}

/**
 *	Expands a polynomial curve based on a start, stop, and step values
 */
function expand_accel(start, stop, step, coeff)
{
	result = [];
	for (t=start; t<stop; t+=step)
	{
			result.push(polyval(t, coeff, 'a'));
	}
	return result;
}

/**
 *	Get swimmer position from bucket position
 */
function apply_bucket_relationship(position)
{
	p = [];
	for(i=0; i<position.length; ++i)
	{
		p.push(position[i]*11.27 + 0.4225);
	}
	return p;
}

/**
 *	Uses standard deviation to determine the start and stop times of the swimmer
 *	and returns truncated arrays
 */
function extract_swim_data(time, accel)
{
	startIndex = 0;
	stopIndex = accel[accel.length-1];

	// constants
	L1 = 0.1;
	L2 = 0.01;
	L3 = 0.01;

	State = {
		STOPPED: 0,
		TRIGGER: 1,
		WALL_PUSH: 2,
		SWIMMING: 3
	}

	// initialize values
	xfm1 = 9.83;
	vim1 = sim1 = 0;
	_state = State.STOPPED;
	trigger_value = 0;
	counter = 0;
	R = 0;
	// iterate over entire data set
	for (i=1; i < accel.length; ++i)
	{
		// calculate the R value
		xf = L1 * accel[i] + (1-L1) * xfm1;
		vi = L2*(accel[i]-xfm1) * (accel[i]-xfm1) + (1-L2)*vim1;
		si = L3 * (accel[i]-accel[i-1]) * (accel[i]-accel[i-1]) + (1-L3)*sim1;
		RM1 = R; // save the previous value of R
		R = ((2-L1) * vi) / si;

		xfm1 = xf;
		vim1 = vi;
		sim1 = si;

		// let the algorithm reach steady-state
		if (i < 10)
			continue;

		switch(_state)
		{
			case State.STOPPED:
			{
				if (R > 4)
				{
					_state = State.TRIGGER;
					trigger_value = R;
					counter = 0;
				}
				break;
			}
			case State.TRIGGER:
			{
				counter++;
				if (counter > 5)
				{
					if (Math.abs(trigger_value - R) < 1)
					{
						// the spike is probably from something else other
						// than a push off the wall
						_state = State.STOPPED;
					}
					else {
						// this is the swimmer getting ready to push off the wall
						_state = State.WALL_PUSH;
						counter = 0;
						//startIndex = i;
					}
				}
				break;
			}
			case State.WALL_PUSH:
			{
					counter++;
					if (counter > 64 && R > 3)
					{
						console.log(counter);
						console.log(R);
						// the swimmer has pushed off the wall
						_state = State.SWIMMING;
						startIndex = i;
						console.log(startIndex);
					}
					break;
			}
			case State.SWIMMING:
			{
				// check for when the ratio crosses the threshold of 1
				if (RM1 > 1 && R < 1)
				{
					counter = 0;
					_state = State.STOPPED;
					stopIndex = i;
					console.log(stopIndex);
				}
				break;
			}
			default:
				// there was some error - return to a stopped State
				console.log("Error. Unknown state.");
				_state = State.STOPPED;
		}
	}

	// trim arrays to match the the times when the swimmer is active
	time = time.slice(startIndex, stopIndex);
	accel = accel.slice(startIndex, stopIndex);

	return[time, accel];
}

/**
 * Applies a second order butterworth filter to a dataset
 */
function filter(x)
{
	// array to hold the filtered output
	y = [];
	y.push(0);
	y.push(0);

	for (k = 2; k < accel.length; ++k)
	{
		// difference equation based on the butter(2, 0.5) MATLAB command
		y.push(0.2928932 *x[k] + 0.5857864*x[k-1] + 0.2928932*x[k-2] - 0.17157287*y[k-2]);
	}
	return y;
}

/**
 *	Centers a dataset around 0
 */
function center(x)
{
	sum = x.reduce(function(a,b) {return a+b;});
	avg = sum / x.length;

	x = x.map(function(s) {return s - avg});

	return x;
}

/**
 *	Applies the Midpoint integratin technique to a dataset
 */
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
	}
	return y;
}

/**
 *	Finds coefficients for a polynomial approximation of a dataset
 */
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

/**
 *	Evaluates a polynomial approximation at a point
 */
function polyval(val, coeff, type)
{
	sum = 0;
	if (type == 'p')
	{
		for (i=0; i < coeff.length; ++i)
		{
			sum += (coeff[i] * Math.pow(val, (coeff.length-1) - i));
		}
	}
	else if (type == 'v')
	{
		for (i=0; i < coeff.length-1; ++i)
		{
			exp = (coeff.length-1) - i;
			sum += coeff[i] * exp * Math.pow(val, exp - 1);
		}
	}
	else if (type == 'a')
	{
		for (i=0; i < coeff.length-2; ++i)
		{
			exp = (coeff.length-1) - i;
			sum += coeff[i] * exp * (exp-1) * Math.pow(val, exp - 2);
		}
	}
	return sum;
}

// export the Proc object
module.exports = Proc;
