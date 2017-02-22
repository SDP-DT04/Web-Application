var app = app || {};
define(['/../common', '/../models/Workout'], function(common) {
    var Backbone = require('backbone');
    console.log('Workout Collection');
    app.WorkoutCollection = Backbone.Collection.extend({
        model: app.Workout,
        url: '/workout'
    });
    return app.WorkoutCollection;
});