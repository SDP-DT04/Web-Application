var app = app || {};
define(['/../common', '/../models/Workout'], function(common) {
    var Backbone = require('backbone');
    console.log('Chart Collection');
    app.ChartCollection = Backbone.Collection.extend({
        model: app.Workout,
        url: '/recent',
    });
    return app.ChartCollection;
});