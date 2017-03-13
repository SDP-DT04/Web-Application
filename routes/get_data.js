var express = require('express');
var router = express.Router();
var db = require('../lib/database.js');
var db_model = require('../database/workout_dbmodel');
var path = require('path');
var exec = require('child_process').exec;

router.get('/', function(req,res) {

    var queryName = req.query['firstname'] + " " + req.query['lastname'];
    var fileName = req.query['firstname'] + req.query['lastname'];
    console.log(queryName);
    db.swimmers.findOne({'name': queryName}, function(err, swimmer) {
        if(!err) {
            console.log(swimmer._id);
            db.workouts.find({swimmer: (swimmer._id)}, function (err, workout) {
                if (!err) {
                    console.log(workout);
                    console.log('mongoexport --db test --collection workouts --query \"{swimmer: \'' + swimmer._id +'\' }\" --out test.csv');
                    exec('mongoexport --db test --collection workouts --query \"{swimmer: ObjectId( \'' + swimmer._id +'\')}\" --out ' + fileName + '.csv' , function(error, stdout, stderr) {
                        if (error) {
                            console.log(error);
                            return;
                        }
                        if(!error) {
                            res.download(fileName + '.csv')
                        }
                        console.log('stdout: ${stdout}');
                        console.log('stderr: ${stderr}');
                    }) ;
                } else {
                    return console.log(err);
                }
            });
        }
        else {
            return console.log(err);
        }
    });
    //Add routes based on swimmer name

});

module.exports = router;
