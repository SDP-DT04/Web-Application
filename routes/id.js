var express = require('express');
var router = express.Router();
var db = require('../database.js');
var Proc = require('../lib/data-processor');
var Xbee = require('../lib/xbee');

router.get('/', function(req,res) {
  //proc = new Proc();
  //proc.process_dataset(function(coeff) {
  //  console.log(coeff);

  //})
  // db.data.find().sort({name:1}, function(err,user) {
  //   if (err) return;
  //   res.json(user);
  // });
  xbee = new Xbee();
  xbee.start();
});

router.get('/:id', function(req,res) {
  var swimmerID = db.ObjectId(req.params.id);
  db.data.findOne({_id: db.ObjectId(swimmerID)}, function (err, user) {
    if (err) return;
    res.json(user);
  })
});

module.exports = router;
