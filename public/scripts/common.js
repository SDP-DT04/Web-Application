require.config({
    paths: {
        'jquery': 'vendor/jquery/dist/jquery',
        'underscore': 'vendor/underscore/underscore',
        'backbone': 'vendor/backbone/backbone',
        'backbone.radio' : 'vendor/backbone.radio/src/backbone.radio',
        'text' : 'vendor/text/text',
        'bootstrap' : 'vendor/bootstrap/dist/js/boostrap',
        'tether': 'vendor/tether/dist/tether',
        'holder': 'vendor/holderjs/holder',
    },
    shim: {
        underscore: {
            exports: '_'
        },
        jquery: {
            exports: '$'
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