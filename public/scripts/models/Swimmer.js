var app = app || {};
define(['backbone'], function(Backbone) {
    console.log('Inside Swimmer.js');
    app.Swimmer = Backbone.Model.extend({
        defaults: {
            Photo: 'images/peresie.jpg',
            Name: 'Coach Peresie',
            RFID_Tag: '1'
        }
    });
    return app.Swimmer;
});