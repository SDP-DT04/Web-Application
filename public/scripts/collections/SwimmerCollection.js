var app = app || {};
define(['backbone', '/../models/Swimmer'], function(Backbone) {
    console.log('Inside Swimmer Collection');
    app.SwimmerCollection = Backbone.Collection.extend({
        model: app.Swimmer
    });
    return app.SwimmerCollection;
});