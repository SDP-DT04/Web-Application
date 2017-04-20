require(['./common', './views/LogView'], function(common, LogView) {
    $(function() {
        var app = new LogView(); //calls the initialize function defined in RosterView.
        //Ping the server every 4 seconds for new information
        //4 seconds was chosen because the design requirement states a maximum of 5 seconds between updates
        //this allows for a 1 second of wiggle room between new data and the data appearing
        setInterval(function() {
            app.collection.fetch().done(function(){
                app.renderUpdate();  //Investigate DOM element removal/automatic updates
            });
        }, 4000);
    });
});

