require.config({
    paths: {
        'jquery': 'vendor/jquery/dist/jquery',
        'underscore': 'vendor/underscore/underscore',
        'backbone': 'vendor/backbone/backbone',
        'backbone.radio' : 'vendor/backbone.radio/src/backbone.radio',
        'text' : 'vendor/text/text',
        'handlebars' : '../../node_modules/handlebars/dist/handlebars.runtime.amd',
        'hbs' : 'vendor/require-handlebars-plugin/hbs',
        'chartjs' : 'vendor/chart.js/src/chart',
        'bootstrap' : 'vendor/bootstrap/dist/js/boostrap',
        'tether': 'vendor/tether/dist/tether',
        'holder': 'vendor/holderjs/holder'
    },
    hbs: {
        templateExtension: 'handlebars'
    },
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            exports: 'Backbone',
            deps: ['jquery', 'underscore']
        },
        bootstrap: {
            deps: ['jquery', 'tether']
        }
    },
    deps: ['jquery', 'underscore']

});

require(['./views/LogView'], function(LogView) {

    //test = [
    //    {Photo: 'images/nebraska.jpg', Name: 'Nebraska', RFID_Tag: '1'},
    //    {Photo: 'images/applin.jpg', Name: 'Applin', RFID_Tag: '2'},
    //    {Photo: 'images/kaltenborn.jpg', Name: 'Kaltenborn', RFID_Tag: '3'},
    //    {Photo: 'images/myers.jpg', Name: "Myers", RFID_Tag: '4'}
    //    ];

    $(function() {
        ///new RosterView();
        new LogView(); //calls the initialize function defined in RosterView.
    });
});
