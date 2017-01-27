require.config({
    paths: {
        'jquery': 'vendor/jquery/dist/jquery',
        'underscore': 'vendor/underscore/underscore',
        'backbone': 'vendor/backbone/backbone',
        'backbone.radio' : 'vendor/backbone.radio/src/backbone.radio',
        'text' : 'vendor/text/text',
        'handlebars' : '../../node_modules/handlebars/dist/handlebars.runtime.amd',
        'hbs' : 'vendor/require-handlebars-plugin/hbs',
        'chartjs' : 'vendor/chart.js/src/chart'
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
        }
    },
    deps: ['jquery', 'underscore'],

});

require(['views/app'], function(AppView) {
    new AppView;
});
