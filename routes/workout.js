var express = require('express');
var router = express.Router();
var db = require('../lib/database.js');
var db_model = require('../database/workout_dbmodel');

router.get('/', function(req,res) {
    db.workouts.find(function(err,workouts) {
        if (!err) {
            console.log(workouts);
            return res.send(workouts);
        } else {
            return console.log(err);
        }
    });
});

router.get('/:id', function(req,res) {
    db.workouts.findOne({_id: db.ObjectId(req.params.id)}, function(err, workout) {
        if (!err) {
            console.log(workout);
            return res.send(workout);
        } else {
            return console.log(err);
        }
    });
});

router.post('/', function(req,res) {
    var workout = new db_model({
        rfid_tag: req.body.rfid_tag,
        date: req.body.date,
        weight: req.body.weight,
        tot_time: req.body.tot_time,
        distance: req.body.distance,
        coefficients:  req.body.coefficients,
        swimmer: req.body.swimmer
    });

    db.workouts.save(workout);
    res.send(workout);
    console.log('new workout created');

});

router.put('/:id', function(req, res) {
    console.log('updating workoout ' + req.body.date)
    db.workouts.findOne({_id: db.ObjectId(req.params.id)}, function(err, workout) {
        workout.rfid_tag = req.body.rfid_tag;
        workout.date = req.body.date;
        workout.tot_time = req.body.tot_time;
        workout.distance = req.body.distance;
        workout.coefficients = req.body.coefficients;
        workout.swimmer = req.body.swimmer;
        db.workouts.save(workout);
    });
});

router.delete('/:id', function(req,res) {
    console.log('deleting workout ' + req.body.date);
    db.swimmers.remove({_id: db.ObjectId(req.params.id)}, function(err, workout) {
        console.log('workout removed');
    });
});

module.exports = router;