var express = require('express');
var router = express.Router();
var db = require('../lib/database.js');
var db_model = require('../swimmer_dbmodel');

router.get('/', function(req,res) {
    db.swimmers.find(function(err,swimmers) {
        if (err) return;
        res.json(swimmers);
    });
});

router.get('/:id', function(req,res) {
    db.swimmers.findOne({_id: db.ObjectId(req.params.id)}, function(err, swimmer) {
        if (err) return;
        res.json(swimmer);
    });
});

router.post('/', function(req,res) {
    var swimmer = new db_model({
        rfid_tag: req.body.rfid_tag,
        name: req.body.name,
        workouts: req.body.workouts
    });

    db.swimmers.save(swimmer);
    console.log('new swimmer created');

});

router.put('/:id', function(req, res) {
   console.log('updating swimmer ' + req.body.name);
    db.swimmers.findOne({_id: db.ObjectId(req.params.id)}, function(err, swimmer) {
       swimmer.rfid_tag = req.body.rfid_tag;
       swimmer.name = req.body.name;
       swimmer.workouts = req.body.workouts;
       db.swimmers.save(swimmer);
   })
});

router.delete('/:id', function(req,res) {
    console.log('deleting swimmer ' + req.body.name);
    db.swimmers.remove({_id: db.ObjectId(req.params.id)}, function(err, swimmer) {
        console.log(req.body.name + ' removed');
    })
})

module.exports = router;