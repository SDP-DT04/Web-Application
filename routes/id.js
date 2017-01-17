var express = require('express');
var router = express.Router();
var db = require('../database.js');

router.get('/', function(req,res) {
  db.data.find().sort({name:1}, function(err,user) {
    if (err) return;
    res.json(user);
  });
});

router.get('/:id', function(req,res) {
  var swimmerID = db.ObjectId(req.params.id);
  db.data.findOne({_id: db.ObjectId(swimmerID)}, function (err, user) {
    if (err) return;
    res.json(user);
  });
});

module.exports = router;

