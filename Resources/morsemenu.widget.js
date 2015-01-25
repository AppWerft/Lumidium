var abx = require('com.alcoapps.actionbarextras');

var crons = [];

module.exports = function(_e) {
    var win = _e.source;
    var data = win.data;

    abx.title = "L u m i d i u m";
    abx.subtitle = "morse factory";
    abx.titleFont = "Sigward.ttf";
    abx.titleColor = "#ff9";
    var activity = _e.source.getActivity();

    activity.actionBar.setDisplayHomeAsUp(true);
    activity.actionBar.onHomeIconItemSelected = function() {
        win.close();
    };
    if (activity) {
        activity.onCreateOptionsMenu = function(e) {
            e.menu.clear();
            e.menu.add({
                title : 'morse factory',
                icon : Ti.App.Android.R.drawable.ic_action_micro,
                showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
            }).addEventListener("click", function(_e) {
                //     require('morse.window')().open();
            });
        };
    }
};
