var express = require('express');
var router = express.Router();
var db = require('../database.js');
var app = require('../server.js');

router.get('/', function(req, res) {
	db.data.find(function(err,user){  //get all the information and put it into docs
		if (err) return;
		res.json(user);
	    });
    });

module.exports = router;