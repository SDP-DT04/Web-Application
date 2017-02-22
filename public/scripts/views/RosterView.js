var app = app || {};

define(['/../common', 'backbone', '/../collections/SwimmerCollection', '/../views/SwimmerView', '/../models/Swimmer'], function(common) {
    var Backbone = require('backbone');
    app.RosterView = Backbone.View.extend({
        el: '#swimmer',

        initialize: function () {
            console.log('Initialize Roster View');
            this.collection = new app.SwimmerCollection();
            this.collection.fetch({reset:true});
            this.render();
            this.listenTo(this.collection, 'reset', this.render );
            this.listenTo(this.collection, 'add', this.renderSwimmer);
        },

        render: function () {
            console.log('Rendering RosterView')
            this.collection.each(function (item) {
                    this.renderSwimmer(item);
                },
                this
            )
        },

        renderSwimmer: function (item) {
            console.log('Rendering Swimmer View');
            var swimmerView = new app.SwimmerView({
                model: item
            });
            this.$el.append(swimmerView.render().el);
        },

        events: {
            'click #add': 'addSwimmer'
        },

        addSwimmer: function(e) {
            e.preventDefault();

            var formData = {};
            $( '#addSwimmer div' ).children( 'input' ).each(function( i, el ) {
                if( $(el).val() !== '')
                {
                    formData[el.id] = $( el ).val();
                    $( el )
                }
            });
            this.collection.create(formData);
        }
    });
    return app.RosterView;
});