//creates a collection of charts
var app = app || {};
define(['/../common', '/../models/Workout'], function(common) {
    var Backbone = require('backbone');
    //console.log('Chart Collection');
    app.ChartCollection = Backbone.Collection.extend({
        model: app.Workout,
        url: '/recent', //server endpoint to retrieve data from for model
    });
    return app.ChartCollection;
});