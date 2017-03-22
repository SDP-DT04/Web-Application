var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var _ = require('underscore');
var exphbs = require('express-handlebars');
var fileUpload = require('express-fileupload');
var db = require('./lib/database.js');
var db_model = require('./database/swimmer_dbmodel');
var sanitize = require('mongo-sanitize');


var routes = require('./routes/index'); //Route for homepage
var swimmer = require('./routes/swimmer');
var workout = require('./routes/workout')
var id = require('./routes/id');
var roster = require('./routes/roster'); //Route for database connection
var name = require('./routes/name');
var chart = require('./routes/chart');
var recent = require('./routes/recent_workouts');
var data_export = require('./routes/export');
var get_data = require('./routes/get_data');
var add = require('./routes/add');
var server = express();


// view engine setup
server.set('views', path.join(__dirname, 'views'));
server.engine('handlebars', exphbs({defaultLayout: 'main'}));
server.set('view engine', 'handlebars'); //Use handlebars for view engine


// uncomment after placing your favicon in /public
//server.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
server.use(logger('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(cookieParser());
server.use(express.static(path.join(__dirname, 'public')));
server.use(fileUpload());


server.use('/id', id); //route based on Swimmer ID
//server.use('/data', data); //route to get all the data from the database
server.use('/name', name); //route based on Swimmer name
server.use('/swimmer', swimmer);
server.use('/workout', workout);
server.use('/roster', roster);
server.use('/chart', chart);
server.use('/recent', recent);
server.use('/export', data_export);
server.use('/get_data', get_data);
server.use('/add', add);

server.post('/add_swimmer', function(req,res) {

    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    var sampleFile = req.files.photo;
    var swimmer = new db_model({
        photo: "images/"+sanitize(req.files.photo.name),
        rfid_tag: sanitize(req.body.rfid_tag),
        name: sanitize(req.body.firstname) + " " + sanitize(req.body.lastname)
    });
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv('./public/images/'+req.files.photo.name, function(err) {
        if (err)
            return res.status(500).send(err);

        console.log('Photo uploaded!');
    })

    db.swimmers.save(swimmer);
    res.sendFile(path.join(__dirname, '/public/',    'add.html'))
    console.log('new swimmer created');

});


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
