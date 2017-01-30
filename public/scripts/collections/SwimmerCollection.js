var app = app || {};
define(['backbone', '/../models/Swimmer'], function(Backbone) {
    console.log('Swimmer Collection');
    app.SwimmerCollection = Backbone.Collection.extend({
        model: app.Swimmer,
        url: '/swimmer'
    });
    return app.SwimmerCollection;
});