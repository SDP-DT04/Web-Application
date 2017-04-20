var app = app || {};
define(['/../common', 'backbone'], function(common) {
    var Backbone = require('backbone');
    //console.log('Swimmer Model');
    //Database model for swimmer
    app.Swimmer = Backbone.Model.extend({
        idAttribute: '_id',
        defaults: {
            photo: 'images/peresie.jpg',
            rfid_tag: '0',
            name: 'Coach Peresie',
            workouts: '[]'
        }
    });
    return app.Swimmer;
});