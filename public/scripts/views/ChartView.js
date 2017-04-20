var app = app || {};
//renders the table of workout data and generates any charts selected
define(['/../common','vendor/chart.js/dist/Chart.bundle.min','../../socket.io/socket.io', '/../collections/ChartCollection', 'backbone', 'underscore'], function(common, Chart, io) {
    var Backbone = require('backbone');
    var _ = require('underscore');
    var socket = io.connect(); //connects to the server to pass data for chart creation
    socket.on('connection', function (data) {
        console.log(data);
    });
    //The ctx is id of the canvas element where the chart should be created
    var ctx = document.getElementById('myChart').getContext('2d');
    //Initialize a default chart with no data
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

    app.ChartView = Backbone.View.extend({
        className: 'chartContainer',
        tagName: 'tr',
        template: _.template($('#workoutTemplate').html()), //template that renders the data
        //When a radio button is selected, chart the data
        events: {
            'click td [type="radio"]': 'checked'
        },
        checked: function() {
            //console.log('radio button changed');
            $('input:radio').off('change').change( function() {
                var $row = $(this).closest("tr");    // Find the row
                var $swimmer = $row.find(".swimmer").text(); // Find the text
                var $date   = $row.find(".dateString").text();

                //console.log($swimmer);

                socket.emit('make chart', {name: $swimmer, date: $date});
                socket.on('position', function(data) {
                    //console.log(data.result.position);
                    myChart.data.datasets[0].data = data.result.position;
                    myChart.data.labels = data.result.time;
                    //console.log(myChart.data.datasets);
                    myChart.update(); //renders chart
                });
            });
        },
            render: function () {
                //console.log('Inside Chart View');
                //this.el is what we defined in tagName. use $el to get access to jQuery html() function
                //console.log(this.model.toJSON());
                //console.log($('#workoutTemplate').html());
                this.$el.html(this.template(this.model.toJSON())); //generates the workout table based on the underscore template
                return this;
            }
    });
    return app.ChartView;
});