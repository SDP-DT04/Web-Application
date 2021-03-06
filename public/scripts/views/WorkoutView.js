var app = app || {};
//Generates a table of recent workouts
define(['/../common', 'backbone', 'underscore'], function(common, io) {
    var Backbone = require('backbone');
    var _ = require('underscore');

    app.WorkoutView = Backbone.View.extend({
        className: 'workoutContainer',
        tagName: 'tr',
        template: _.template($('#workoutTemplate').html()),

        render: function () {
            //console.log('Inside Workout View');
            //this.el is what we defined in tagName. use $el to get access to jQuery html() function
            //console.log(this.model.toJSON());
            //console.log($('#workoutTemplate').html());
            this.$el.html(this.template(this.model.toJSON())); //renders workout table
            return this;
        }
    });
    return app.WorkoutView;
});