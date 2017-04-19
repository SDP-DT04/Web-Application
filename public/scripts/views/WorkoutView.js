var app = app || {};

define(['/../common','./ChartView', '../../socket.io/socket.io', 'backbone', 'underscore'], function(common, ChartView, io) {
    var Backbone = require('backbone');
    var _ = require('underscore');
    var socket = io.connect();
    socket.on('connection', function (data) {
        console.log(data);
    });
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'position',
                data: []
            }]

        }
    });

    app.WorkoutView = Backbone.View.extend({
        className: 'workoutContainer',
        tagName: 'tr',
        template: _.template($('#workoutTemplate').html()),
        events: {
            'click td [type="radio"]': 'checked'
        },
        checked: function() {
            console.log('radio button changed');
            $('input:radio').off('change').change( function() {
                    var $row = $(this).closest("tr");    // Find the row
                    var $swimmer = $row.find(".swimmer").text(); // Find the text
                    var $date   = $row.find(".dateString").text();

                    console.log($swimmer);

                    socket.emit('make chart', {name: $swimmer, date: $date});
                    socket.on('position', function(data) {
                        console.log(data.result.position);
                        myChart.data.datasets[0].data = data.result.position;
                        myChart.data.labels = data.result.time;
                        console.log(myChart.data.datasets);
                        myChart.update();
                    });
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