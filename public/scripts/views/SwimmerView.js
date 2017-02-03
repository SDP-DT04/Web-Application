var app = app || {};

define(['backbone', 'underscore'], function(Backbone, _) {
    app.SwimmerView = Backbone.View.extend({
        className: 'swimmerContainer',
        template: _.template($('#swimmerTemplate').html()),

        render: function () {
            console.log('Rendering Swimmer View');
            //this.el is what we defined in tagName. use $el to get access to jQuery html() function
            console.log(this.model.attributes);
            console.log($('#swimmerTemplate').html());
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        events: {
            'click .delete': 'deleteSwimmer'
        },

        deleteSwimmer: function(){
            console.log('Deleting Swimmer in Backbone')
            this.model.destroy();
            this.remove();
        }

    });
    return app.SwimmerView;
});