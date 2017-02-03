var app = app || {};

define(['backbone', 'underscore'], function(Backbone, _) {
    app.WorkoutView = Backbone.View.extend({
        className: 'workoutContainer',
        template: _.template($('#workoutTemplate').html()),

        render: function () {
            console.log('Rendering Workout View');
            //this.el is what we defined in tagName. use $el to get access to jQuery html() function
            console.log(this.model.toJSON());
            console.log($('#workoutTemplate').html());
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });
    return app.WorkoutView;
});