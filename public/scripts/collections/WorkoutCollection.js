//A collection of workouts
var app = app || {};
define(['/../common', '/../models/Workout'], function(common) {
    var Backbone = require('backbone');
    //console.log('Workout Collection');
    app.WorkoutCollection = Backbone.Collection.extend({
        model: app.Workout,
        url: '/recent', //server endpoint to retrieve data from for model
    });
    return app.WorkoutCollection;
});