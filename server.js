var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var fileUpload = require('express-fileupload');
var db = require('./lib/database.js'); //gives access to database and collections
var db_model = require('./database/swimmer_dbmodel'); //models for data entries into DB
var sanitize = require('mongo-sanitize'); //prevent injection attacks

var routes = require('./routes/index'); //Route for homepage
var swimmer = require('./routes/swimmer'); //GETS swimmer data in database
var workout = require('./routes/workout'); //GETS workout data in database
var roster = require('./routes/roster'); //serves HTML page for 'View Swimmer'
var chart = require('./routes/chart'); //serves HTML page for 'Chart Data'
var recent = require('./routes/recent_workouts'); //GETS recent_workout data in database
var data_export = require('./routes/export'); //serves HTML for 'Export Data'
var get_data = require('./routes/get_data'); //GETS data to export from database
var add = require('./routes/add'); //serves HTML for 'Add/Edit Swimmer'
var del = require('./routes/delete'); //serves HTML for 'Delete Swimmer'
var help = require('./routes/help'); //serves HTML for 'Help'
//creates express object instance
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


server.use('/swimmer', swimmer); //gets swimmer data from database
server.use('/roster', roster); //serves 'View Swimmers' html
server.use('/chart', chart); //serves 'Chart Data' html
server.use('/recent', recent); //gets recent workouts
server.use('/export', data_export); //serves HTML for export data
server.use('/get_data', get_data); //gets data for exportation
server.use('/add', add); //serves HTML for 'Add/Edit swimmers'
server.use('/delete', del); //serves HTML for 'Delete Swimmer'
server.use('/help', help); //serves HTML for Help page

//Adds swimmer to the database
server.post('/add_swimmer', function(req,res) {
    //The sanitize function is used here to protect our database from attacks
    var queryName = sanitize(req.body.firstname) + " " + sanitize(req.body.lastname);
    var photoPath = "images/Z.png"; //default image if none is specified
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
            //console.log('creating new swimmer');
            var new_swimmer = new db_model({
                photo: photoPath,
                rfid_tag: rfidTag,
                name: queryName
            });
            if (req.files.photo) { //If a file is specified, set the photo attribute
                //console.log('moving photo');
                sampleFile.mv('./public/images/' + req.files.photo.name, function (err) {
                    if (err)
                        return res.status(500).sendFile(path.join(__dirname, '/public/', 'add_fail.html'));
                    //console.log('Photo uploaded!');
                });
            }
            db.swimmers.save(new_swimmer); //add to database
            res.status(200).sendFile(path.join(__dirname, '/public/', 'add_success.html'))
            //console.log('new swimmer created');
        }
            else { //Update the existing swimmers data
                //console.log('updating');
                if (req.body.rfid_tag) { //If the RFID tag was specified, update the entry
                    //console.log('changing RFID Tag');
                    swimmer.rfid_tag = rfidTag;
                }
                if (req.files.photo) { //If a file was uploaded, update the entry
                    //console.log('changing photo');
                    swimmer.photo = photoPath;
                    sampleFile.mv('./public/images/' + req.files.photo.name, function (err) {
                        if (err)
                            return res.status(500).sendFile(path.join(__dirname, '/public/', 'add_fail.html'));
                        //console.log('Photo uploaded!');
                    })
                }
                db.swimmers.save(swimmer); //add to database
                res.status(200).sendFile(path.join(__dirname, '/public/', 'add_success_edit.html'));
                //console.log('Edits successfully made');
            }
    });
});

//delete the swimmer specified by name
server.post('/delete_swimmer', function(req,res) {
    //console.log(req.body.firstname);
    var queryName = sanitize(req.body.firstname) + " " + sanitize(req.body.lastname);
    //console.log('deleting ' + queryName);
    db.swimmers.remove({'name': queryName}, function(err,result) {
        //console.log(result);
        if(result.n === 0) { //result.n specifies the number of deletions, if this is 0 then no one was deleted
            res.sendFile(path.join(__dirname, '/public/', 'delete_fail.html'));
        }
        else { //successful delete
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
