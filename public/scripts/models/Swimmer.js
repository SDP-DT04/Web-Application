var app = app || {};
define(['backbone'], function(Backbone) {
    console.log('Swimmer.js');
    app.Swimmer = Backbone.Model.extend({
        idAttribute: '_id',
        defaults: {
            photo: 'images/peresie.jpg',
            rfid_tag: '1234',
            name: 'Coach Peresie'
        }
    });
    return app.Swimmer;
});