var app = app || {};

define(['../common', 'backbone', 'underscore', 'jquery'], function(common) {
    var Backbone = require('backbone');
    var _ = require('underscore');
    var $ = require('jquery');
    app.SwimmerView = Backbone.View.extend({
        className: 'swimmerContainer',
        template: _.template($('#swimmerTemplate').html()),

        render: function () {
            //console.log('Rendering Swimmer View');
            //this.el is what we defined in tagName. use $el to get access to jQuery html() function
            //console.log(this.model.attributes);
            //console.log($('#swimmerTemplate').html());
            this.$el.html(this.template(this.model.toJSON())); //render each swimmer based on the underscore template
            return this;
        }
    });
    return app.SwimmerView;
});