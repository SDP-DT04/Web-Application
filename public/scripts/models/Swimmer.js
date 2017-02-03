var app = app || {};
define(['backbone'], function(Backbone) {
    console.log('Swimmer Model');
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