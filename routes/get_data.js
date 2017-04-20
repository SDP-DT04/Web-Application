var express = require('express');
var router = express.Router();
var db = require('../lib/database.js');
var path = require('path');
var exec = require('child_process').exec;
var sanitize = require('mongo-sanitize');

router.get('/', function(req,res) {

    var firstname = sanitize(req.query['firstname']);
    var lastname = sanitize(req.query['lastname']);
    var startdate = sanitize(req.query['startdate']);
    var enddate = sanitize(req.query['enddate']);

    var queryName = firstname + " " + lastname;
    var fileName = firstname + lastname;
    startdate = (new Date(startdate)).toISOString();
    enddate = (new Date(enddate)).toISOString();

    db.swimmers.findOne({'name': queryName}, function (err, swimmer) {
        if (!err) {
            //console.log(swimmer._id);
            db.workouts.find({swimmer: (swimmer._id)}, function (err, workout) {
                if (!err) {
                    console.log(workout);
                    console.log('mongoexport --db test --collection workouts --query \'{swimmer: ObjectId(\"' + swimmer._id + '\"), date: {$gte: ISODate("' + startdate + '"), $lte: ISODate("' + enddate + '")}}\' --out ' + fileName + '.csv');
                    exec('mongoexport --db test --collection workouts --query \'{swimmer: ObjectId(\"' + swimmer._id + '\"), date: {$gte: ISODate("' + startdate + '"), $lte: ISODate("' + enddate + '")}}\' --out ' + fileName + '.csv', function (error, stdout, stderr) {
                        if (error) {
                            console.log(error);
                            return;
                        }
                        if (!error) {
                            res.download(fileName + '.csv')
                        }
                    });
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
