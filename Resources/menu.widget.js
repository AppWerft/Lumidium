var abx = require('com.alcoapps.actionbarextras');

var crons = [];

module.exports = function(_e) {
    var win = _e.source;
    var data = win.data;
    
    abx.title = "L u m i d i u m";
    abx.subtitle = "the element of light";
    abx.titleFont = "Ayherre.ttf";
    abx.titleColor = "#ff9";
    var activity = _e.source.getActivity();
    if (activity) {
        activity.onCreateOptionsMenu = function(e) {
            e.menu.clear();
            e.menu.add({
                title : 'morse factory',
                icon : Ti.App.Android.R.drawable.ic_action_morse,
                showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
            }).addEventListener("click", function(_e) {
                require('morse/window')().open();
            });
            e.menu.add({
                title : 'vimeo',
                icon : Ti.App.Android.R.drawable.ic_action_v,
                showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
            }).addEventListener("click", function(_e) {
                require('vimeo.window')().open();
            });
            /*
             e.menu.add({
             title : 'ABC',
             icon : Ti.App.Android.R.drawable.ic_action_abc,
             showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
             }).addEventListener("click", function(_e) {
             require('marquee.window')().open();
             });*/
            data.forEach(function(item, i) {
                e.menu.add({
                    title : item.title,
                    showAsAction : Ti.Android.SHOW_AS_ACTION_NEVER,
                    itemId : i
                }).addEventListener("click", function(_e) {
                    win.flipcontainer.flipToView(_e.source.itemId);
                    activity.invalidateOptionsMenu();
                });
            });
        };
    }
};
