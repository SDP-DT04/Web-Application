require(['./common', './views/LogView'], function(common, LogView) {
    $(function() {
        new LogView(); //calls the initialize function defined in RosterView.
    });
});

