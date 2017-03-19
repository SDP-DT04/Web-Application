var express = require('express');
var router = express.Router();
var db = require('../lib/database.js');
var db_model = require('../database/workout_dbmodel');
var path = require('path');
var exec = require('child_process').exec;
var sanitize = require('mongo-sanitize');

router.get('/', function(req,res) {

    var firstname = sanitize(req.query['firstname']);
    var lastname = sanitize(req.query['lastname']);
    var startdate = sanitize(req.query['startdate']);
    var enddate = sanitize(req.query['enddate']);
    var oneday = 1000 * 3600 * 24 * 3;

    var queryName = firstname + " " + lastname;
    var fileName = firstname + lastname;
    startdate = (new Date(startdate)).toISOString();
    enddate = (new Date(enddate)).toISOString();


    //console.log(startdate.getTime()+oneday);
    // if (startdate > enddate) {
    //     //this is an invalid date range, alert the user accordingly
    // }

        db.swimmers.findOne({'name': queryName}, function(err, swimmer) {
            if(!err) {
                console.log(swimmer._id);
                db.workouts.find({swimmer: (swimmer._id)}, function (err, workout) {
                    if (!err) {
                        console.log(workout);
                        console.log('mongoexport --db test --collection workouts --query \'{swimmer: ObjectId(\"' + swimmer._id +'\"), date: {$gte: ISODate("' + startdate + '"), $lte: ISODate("' + enddate + '")}}\' --out ' + fileName + '.csv');
                        exec('mongoexport --db test --collection workouts --query \'{swimmer: ObjectId(\"' + swimmer._id +'\"), date: {$gte: ISODate("' + startdate + '"), $lte: ISODate("' + enddate + '")}}\' --out ' + fileName + '.csv' , function(error, stdout, stderr) {
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
});

module.exports = router;
