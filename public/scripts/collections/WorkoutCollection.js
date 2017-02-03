var app = app || {};
define(['backbone', '/../models/Workout'], function(Backbone) {
    console.log('Workout Collection');
    app.WorkoutCollection = Backbone.Collection.extend({
        model: app.Workout,
        url: '/workout'
    });
    return app.WorkoutCollection;
});