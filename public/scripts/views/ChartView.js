var app = app || {};

define(['/../common','vendor/chart.js/dist/Chart.bundle.min', '/../collections/ChartCollection', 'backbone'], function(common, Chart) {
    var Backbone = require('backbone');
    app.ChartView = Backbone.View.extend({
        //className: 'chartContainer',
            initialize: function() {
                this.collection = new app.ChartCollection();
                //this.collection.fetch({reset:true});
                this.render();
            },
            render: function () {
                console.log('Inside Chart View');
                var ctx = document.getElementById('myChart').getContext('2d');
                var date = document.getElementById('date').innerHTML;
                console.log(date);
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
    });
    return app.ChartView;
});