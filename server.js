var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var _ = require('underscore');

var routes = require('./routes/index'); //Route for homepage
var swimmer = require('./routes/swimmer');
var id = require('./routes/id');
var data = require('./routes/data'); //Route for database connection
var name = require('./routes/name');
var server = express();

// view engine setup
//server.set('views', path.join(__dirname, 'views'));
//server.engine('handlebars', exphbs({defaultLayout: 'main'}));
//server.set('view engine', 'handlebars'); //Use handlebars for view engine
//server.set('view engine', 'html');;
server.engine('html', require('uinexpress').__express);
server.set('view engine', 'html');

// uncomment after placing your favicon in /public
//server.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
server.use(logger('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(cookieParser());
server.use(express.static(path.join(__dirname, 'public')));


server.use('/id', id); //route based on Swimmer ID
server.use('/data', data); //route to get all the data from the database
server.use('/name', name); //route based on Swimmer name
server.use('/swimmer', swimmer)

// catch 404 and forward to error handler
server.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (server.get('env') === 'development') {
  server.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
server.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = server;
