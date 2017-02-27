var app = app || {};

define(['/../common','vendor/chart.js/dist/Chart.bundle.min', 'backbone'], function(common, Chart) {
    var Backbone = require('backbone');
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
                    console.log('checked');
                    var ctx = document.getElementById('myChart').getContext('2d');
                    var myChart = new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
                            datasets: [{
                                label: 'apples',
                                data: [12, 19, 3, 17, 6, 3, 7],
                                backgroundColor: "rgba(153,255,51,0.4)"
                            }, {
                                label: 'oranges',
                                data: [2, 29, 5, 5, 2, 3, 10],
                                backgroundColor: "rgba(255,153,0,0.4)"
                            }]
                        }
                    });
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