var express = require('express');
var router = express.Router();
var mongojs = require('mongojs'); //Needed to connect to the database

var dbURL = 'test'; //URL to database, current assumed locally
var collections = ['data']; //name of collection to pull from within database

var db = mongojs(dbURL, collections); //setup database connection

router.get('/', function(req, res, next) {
	db.data.find(function(err,docs){  //get all the information and put it into docs
		if (err) return;
		res.json(docs);
	    });
    });

module.exports = router;