var express = require('express');
var router = express.Router();
var db = require('../lib/database.js');
var db_model = require('../database/workout_dbmodel');
var path = require('path');

router.get('/', function(req,res) {
    console.log('here');
    res.sendFile(path.join(__dirname, '../public/',    'export.html'))
});

module.exports = router;
