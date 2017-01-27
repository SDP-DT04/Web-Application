var mongojs = require('mongojs'); //Needed to connect to the database

var dbURL = 'test'; //URL to database, current assumed locally
var collections = ['swimmers', 'data']; //name of collection to pull from within database

var db = mongojs(dbURL, collections); //setup database connection

module.exports = db;
