var app = app || {};

define(['/../common','./ChartView', '../../socket.io/socket.io', 'backbone', 'underscore'], function(common, ChartView, io) {
    var Backbone = require('backbone');
    var _ = require('underscore');
    var socket = io.connect();
    socket.on('connection', function (data) {
        console.log(data);
    });

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
                    var $row = $(this).closest("tr");    // Find the row
                    var $swimmer = $row.find(".swimmer").text(); // Find the text
                    var $date   = $row.find(".dateString").text();

                    socket.emit('make chart', {name: $swimmer, date: $date});
                    socket.on('position', function(data) {
                        console.log(data.result.position);
                        var ctx = document.getElementById('myChart').getContext('2d');
                        var myChart = new Chart(ctx, {
                            type: 'line',
                            data: {
                                labels: data.result.time,
                                datasets: [{
                                    label: 'position',
                                    data: data.result.position
                                }]
                            }

                        });
                    });
                }
                    if (!this.checked) {
                        $('#myChart').remove();
                        $('#chartHolder').append('<canvas id="myChart"></canvas>');
                    }
            });
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