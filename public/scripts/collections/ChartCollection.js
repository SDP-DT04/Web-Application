var app = app || {};
define(['/../common', '/../models/Chart'], function(common) {
    var Backbone = require('backbone');
    console.log('Chart Collection');
    app.ChartCollection = Backbone.Collection.extend({
        model: app.Chart,
        url: '/recent',
    });
    return app.ChartCollection;
});