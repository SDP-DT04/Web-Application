var mongoose = require('mongoose');

var swimmer = new mongoose.Schema({
    photo: String,
    rfid_tag: String,
    name: String,
    workouts: Array
});

var db_model = mongoose.model('swimmer', swimmer);

module.exports = db_model;