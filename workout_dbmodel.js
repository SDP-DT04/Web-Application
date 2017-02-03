var mongoose = require('mongoose');

var workout = new mongoose.Schema({
    rfid_tag: String,
    date: String,
    weight: String,
    tot_time: String,
    distance: String,
    coefficients: Array,
    swimmer: String
});


var db_model = mongoose.model('workout', workout);

module.exports = db_model;