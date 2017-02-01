var app = app || {};
define(['backbone'], function(Backbone) {
    console.log('Swimmer.js');
    app.Swimmer = Backbone.Model.extend({
        idAttribute: '_id',
        defaults: {
          swimmer : 'Ethan Schweinsberg',
          distance : 7.1,
          weight : 50,
          max_force : 666,
          tot_time : 17,
        }
    });
    return app.Swimmer;
});
