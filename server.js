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
var workout = require('./routes/workout');
var id = require('./routes/id');
var roster = require('./routes/roster'); //Route for database connection
var name = require('./routes/name');
var chart = require('./routes/chart');
var recent = require('./routes/recent_workouts');
var data_export = require('./routes/export');
var get_data = require('./routes/get_data');
var add = require('./routes/add');
var make_chart = require('./routes/make_chart');
var del = require('./routes/delete');
var help = require('./routes/help');
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
server.use('/make_chart', make_chart);
server.use('/delete', del);
server.use('/help', help);

server.post('/add_swimmer', function(req,res) {
    //The sanitize function is used here to protect our database from attacks
    var queryName = sanitize(req.body.firstname) + " " + sanitize(req.body.lastname);
    var photoPath = "images/Z.png";
    var rfidTag = 0;
    if (req.files.photo) {
        var sampleFile = req.files.photo;
        photoPath = "images/"+sanitize(req.files.photo.name);
    }
    if (req.body.rfid_tag) {
        rfidTag = sanitize(req.body.rfid_tag);
    }

    db.swimmers.findOne({'name': queryName}, function (err, swimmer) {
        if (!swimmer) { //add a new swimmer if they are not in the database
            console.log('creating new swimmer');
            var new_swimmer = new db_model({
                photo: photoPath,
                rfid_tag: rfidTag,
                name: queryName
            });
            if (req.files.photo) {
                console.log('moving photo');
                sampleFile.mv('./public/images/' + req.files.photo.name, function (err) {
                    if (err)
                        return res.status(500).sendFile(path.join(__dirname, '/public/', 'add_fail.html'));
                    //console.log('Photo uploaded!');
                });
            }
            db.swimmers.save(new_swimmer);
            res.status(200).sendFile(path.join(__dirname, '/public/', 'add_success.html'))
            //console.log('new swimmer created');
        }
            else { //Update the existing swimmers data
                console.log('updating');
                if (req.body.rfid_tag) {
                    console.log('changing RFID Tag');
                    swimmer.rfid_tag = rfidTag;
                }
                if (req.files.photo) {
                    //console.log('changing photo');
                    swimmer.photo = photoPath;
                    sampleFile.mv('./public/images/' + req.files.photo.name, function (err) {
                        if (err)
                            return res.status(500).sendFile(path.join(__dirname, '/public/', 'add_fail.html'));
                        //console.log('Photo uploaded!');
                    })
                }
                db.swimmers.save(swimmer);
                res.status(200).sendFile(path.join(__dirname, '/public/', 'add_success_edit.html'));
                //console.log('Edits successfully made');
            }
    });
});

server.post('/delete_swimmer', function(req,res) {
    console.log(req.body.firstname);
    var queryName = sanitize(req.body.firstname) + " " + sanitize(req.body.lastname);
    console.log('deleting ' + queryName);
    db.swimmers.remove({'name': queryName}, function(err,result) {
        console.log(result);
        if(result.n === 0) {
            res.sendFile(path.join(__dirname, '/public/', 'delete_fail.html'));
        }
        else {
            res.status(200).sendFile(path.join(__dirname, '/public/', 'delete_success.html'));
        }
    });
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
