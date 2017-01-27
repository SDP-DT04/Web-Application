var mongoose = require('mongoose');

mongoose.Promise = Promise;

var swimmer = new mongoose.Schema({
    rfid_tag: String,
    name: String,
    workouts: Array
});

var db_model = mongoose.model('swimmer', swimmer);

module.exports = db_model;