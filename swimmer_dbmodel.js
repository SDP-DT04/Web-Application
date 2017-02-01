var mongoose = require('mongoose');

mongoose.Promise = Promise;

var swimmer = new mongoose.Schema({
    rfid_tag: String,
    date: String,
    weight: Number,
    tot_time: Number,
    distance: Number,
    max_force: Number,
    coefficients: Array,
    swimmer: String
});
var db_model = mongoose.model('swimmer', swimmer);

module.exports = db_model;
