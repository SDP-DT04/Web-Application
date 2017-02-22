var app = app || {};
define(['/../common', '/../models/Swimmer'], function(common) {
    var Backbone = require('backbone');
    console.log('Swimmer Collection');
    app.SwimmerCollection = Backbone.Collection.extend({
        model: app.Swimmer,
        url: '/swimmer'
    });
    return app.SwimmerCollection;
});