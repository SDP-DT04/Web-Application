var express = require('express');
var router = express.Router();
var db = require('../lib/database.js');
var db_model = require('../database/workout_dbmodel');
var path = require('path');
var exec = require('child_process').exec;

router.get('/', function(req,res) {

    var name = req.query['firstname'] + " " + req.query['lastname'];
    console.log(name);
    db.swimmers.findOne({'name': name}, function(err, swimmer) {
        if(!err) {
            console.log(swimmer._id);
            db.workouts.find({swimmer: (swimmer._id)}, function (err, workout) {
                if (!err) {
                    console.log(workout);
                    var s_id = swimmer._id;
                    console.log('mongoexport --db test --collection workouts --query \"{swimmer: \'' + s_id +'\' }\" --out test.csv');
                    exec('mongoexport --db test --collection workouts --query \"{swimmer: ObjectId( \'' + s_id +'\')}\" --out test.csv', function(error, stdout, stderr) {
                        if (error) {
                            console.log(error);
                            return;
                        }
                        if(!error) {
                            res.download('test.csv')
                        }
                        console.log('stdout: ${stdout}');
                        console.log('stderr: ${stderr}');
                    }) ;
                    //res.sendFile(path.join(__dirname, '../public/', 'export.html'))
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
