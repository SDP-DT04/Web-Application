var app = app || {};
//Analytics view is essentially a copy of LogView, but the ChartView plots the data selected in the table
define(['/../common', 'backbone', 'underscore', '/../collections/ChartCollection', '/../views/ChartView', '/../models/Workout'], function(common) {
    var Backbone = require('backbone');
    app.AnalyticsView = Backbone.View.extend({
        el: '#workout', //html id to place data into

        initialize: function () {
            //console.log('Initialize Analytics View');
            this.collection = new app.ChartCollection();
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
            //console.log('Rendering Chart View');
            var chartView = new app.ChartView({
                model: item
            });
            this.$el.append(chartView.render().el);
        }
    });
    return app.AnalyticsView;
});