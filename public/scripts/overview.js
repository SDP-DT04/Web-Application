require(['./common', './views/LogView'], function(common, LogView) {
    $(function() {
        var app = new LogView(); //calls the initialize function defined in RosterView.
        setInterval(function() {
            app.collection.fetch().done(function(){
                app.renderUpdate();  //Investigate DOM element removal/automatic updates
            });
        }, 5000);
    });
});

