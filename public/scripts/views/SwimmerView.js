var app = app || {};

define(['backbone', 'underscore'], function(Backbone, _) {
    console.log('Inside Swimmer View');
    app.SwimmerView = Backbone.View.extend({
        className: 'swimmerContainer',
        template: _.template($('#swimmerTemplate').html()),

        render: function () {
            //this.el is what we defined in tagName. use $el to get access to jQuery html() function
            this.$el.html(this.template(this.model.attributes));
            return this;
        },

        events: {
            'click .delete': 'deleteSwimmer'
        },

        deleteSwimmer: function(){
            this.model.destroy();
            this.remove();
        }

    });
    return app.SwimmerView;
});