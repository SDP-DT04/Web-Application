var app = app || {};

define(['/../common','./ChartView', 'backbone', 'underscore'], function(common, ChartView) {
    var Backbone = require('backbone');
    var _ = require('underscore');
    app.WorkoutView = Backbone.View.extend({
        className: 'workoutContainer',
        tagName: 'tr',
        template: _.template($('#workoutTemplate').html()),
        events: {
            'click td [type="checkbox"]': 'checked'
        },
        checked: function() {
            console.log("events handler for " + this.el.innerHTML);
            //add javascript call to draw chart
            $(':checkbox').change(function() {
                if (this.checked) {
                    $(function() {
                        new ChartView();
                    })
                }
                if (!this.checked) {
                    console.log('uncheck');
                    $('#myChart').remove();
                    $('#chartHolder').append('<canvas id="myChart"></canvas>');
                }
            })
        },
        render: function () {
            console.log('Inside Workout View');
            //this.el is what we defined in tagName. use $el to get access to jQuery html() function
            console.log(this.model.toJSON());
            console.log($('#workoutTemplate').html());
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });
    return app.WorkoutView;
});