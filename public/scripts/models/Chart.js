var app = app || {};
define(['../common', 'backbone'], function(common) {
    var Backbone = require('backbone');
    //console.log('Workout Model');
    //Database model for workout, needed to show data on the charting page
    app.Workout = Backbone.Model.extend({
        idAttribute: '_id',
        defaults: {
            rfid_tag: '0',
            date: '0',
            dateString: '0',
            weight: '0',
            tot_time: '0',
            acc_time: '0',
            distance: '0',
            max_force: '0',
            coefficients: '[]'
        }
    });
    return app.Workout;
});
