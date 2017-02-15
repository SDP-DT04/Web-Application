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

require(['./views/RosterView'], function(RosterView) {

    $(function() {
        new RosterView(); //calls the initialize function defined in RosterView.
    });
});
