var app = app || {};
//Overall view for homepage table of workout data

define(['/../common', 'backbone', 'underscore', '/../collections/WorkoutCollection', '/../views/WorkoutView', '/../models/Workout'], function(common) {
    var Backbone = require('backbone');
    app.LogView = Backbone.View.extend({
        el: '#workout',

        initialize: function () {
            //console.log('Initialize Log View');
            this.collection = new app.WorkoutCollection();
            this.collection.fetch({reset:true});
            this.render();
            this.listenTo(this.collection, 'reset', this.render );
        },

        render: function () {
            //console.log('Rendering Log View');
            this.collection.each(function (item) {
                    this.renderWorkout(item);
                },
                this
            )
        },

        renderWorkout: function (item) {
            //console.log('Rendering Workout View');
            var workoutView = new app.WorkoutView({
                model: item
            });
            this.$el.append(workoutView.render().el);
        },

        //Used to update table with new data on an interval
        renderUpdate: function() {
            this.$el.empty();
            this.collection.each(function(item) {
                this.renderNewWorkout(item);
            },
            this
            )
        },

        renderNewWorkout: function(item) {
            //console.log('Rendering Workout Update');
            var workoutView = new app.WorkoutView({
                model:item
            });
            this.$el.append(workoutView.render().el)
        }
    });
    return app.LogView;
});