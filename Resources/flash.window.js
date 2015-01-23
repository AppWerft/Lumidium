var torch = require('ti.light');
var Draggable = require('ti.draggable');

module.exports = function() {
    var win = Titanium.UI.createWindow({
        fullscreen : true,
        backgroundColor : 'black',
        orientationModes : [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT]
    });
    win.add(Ti.UI.createImageView({
        image : '/images/flashbg.png',
        width : Ti.UI.FILL,
        height : Ti.UI.FILL
    }));
    var blitz = Draggable.createView({
        backgroundImage : 'images/flash.png',
        width : 100,
        left : 50,
        top : 50,
        height : 100
    });
    win.add(blitz);
    var abx = require('com.alcoapps.actionbarextras');
    var crons = [];
    var cron = setInterval(function() {
        if (torch.isSupported()) {
            torch.turnOn();
           // blitz.opacity = 1;
            setTimeout(function() {
                torch.turnOff();
                      }, 5);
        }

    }, 100);
    crons.push(cron);
    win.addEventListener('close', function() {
        crons.forEach(function(cron) {
            clearInterval(cron);
            torch.turnOff();
        });
    });
    torch.isSupported() && torch.turnOff();
    win.addEventListener('open', function() {
        abx.title = "L u m i d i u m";
        abx.subtitle = "flash factory";
        abx.titleFont = "Sigward.ttf";
        abx.titleColor = "#ff9";
        var activity = win.getActivity();
        if (!activity.actionBar)
            return;
        activity.actionBar.setDisplayHomeAsUp(true);
        activity.actionBar.onHomeIconItemSelected = function() {
            win.close();
        };
    });
    return win;
};
