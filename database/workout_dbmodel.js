var mongoose = require('mongoose');

//model for workout entries
var workout = new mongoose.Schema({
    rfid_tag: String,
    date: String,
    dateString: String,
    weight: String,
    tot_time: String,
    distance: String,
    max_force: String,
    coefficients: Array,
    swimmer: String
});


var db_model = mongoose.model('workout', workout);

module.exports = db_model;
