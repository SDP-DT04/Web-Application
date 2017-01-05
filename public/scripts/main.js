require.config({
    paths: {
        'jquery': 'vendor/jquery/dist/jquery',
        'underscore': 'vendor/underscore/underscore',
        'backbone': 'vendor/backbone/backbone',
        'backbone.marionette' : 'vendor/backbone.marionette/lib/backbone.marionette',
        'backbone.radio' : 'vendor/backbone.radio/src/backbone.radio'
    },
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            exports: 'Backbone',
            deps: ['jquery', 'underscore']
        },
        marionette: {
            exports: 'Backbone.Marionette',
            deps: ['backbone']
        }
    },
    deps: ['jquery', 'underscore']
});

require(['views/app'], function(AppView) {
    new AppView;
});