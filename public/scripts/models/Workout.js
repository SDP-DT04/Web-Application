var app = app || {};
define(['../common', 'backbone'], function(common) {
    var Backbone = require('backbone');
    console.log('Workout Model');
    app.Workout = Backbone.Model.extend({
        idAttribute: '_id',
        defaults: {
            rfid_tag: '0',
            date: '0',
            weight: '0',
            tot_time: '0',
            distance: '0',
            coefficients: '[]',
        }
    });
    return app.Workout;
});