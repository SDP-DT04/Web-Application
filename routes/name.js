var express = require('express');
var router = express.Router();
var db = require('../database.js');

router.get('/', function(req,res) {
    db.data.find().sort({name:1}, function(err,user) {
        if (err) return;
        res.json(user);
    });
});

router.get('/:name', function(req,res) {
    db.data.find({name: req.params.name}, function (err, user) {
        if (err) return;
        res.json(user);
    });
});

router.post('/', function(req, res){
    console.log(req.body);
    db.data.save(req.body);
    res.json(req.body);
})


module.exports = router;