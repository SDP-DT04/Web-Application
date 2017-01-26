var app = app || {};

define(['backbone', '/../collections/SwimmerCollection', '/../views/SwimmerView', '/../models/Swimmer'], function(Backbone) {
    console.log('Inside Roster View!');
    app.RosterView = Backbone.View.extend({
        el: '#swimmer',

        initialize: function (initialSwimmer) {
            this.collection = new app.SwimmerCollection(initialSwimmer);
            this.listenTo(this.collection, 'add', this.renderSwimmer);
            this.render();
        },

        render: function () {
            this.collection.each(function (item) {
                    this.renderSwimmer(item);
                },
                this
            )
        },

        renderSwimmer: function (item) {
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
            this.collection.add( new app.Swimmer(formData))
        }
    });
    return app.RosterView;
});