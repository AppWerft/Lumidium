var torch = require('ti.light');
var Draggable = require('ti.draggable');
var abx = require('com.alcoapps.actionbarextras');
var speechrecognizerModule = require('jp.isisredirect.speechrecognizer');
var speechrecognizer = speechrecognizerModule.createSpeechRecognizer();
speechrecognizer['language_preference'] = Ti.Locale.getCurrentLocale();
var morse = require('morse');

module.exports = function() {
    var win = Titanium.UI.createWindow({
        fullscreen : true,
        backgroundColor : 'black',
        orientationModes : [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT]
    });
    speechrecognizer.addEventListener(speechrecognizerModule.READYFORSPEECH, function(e) {
        Ti.UI.createNotification({
            message : 'Ready for speech.'
        }).show();
        // conTextField.value += e.type +"\n";
    });
    speechrecognizer.addEventListener(speechrecognizerModule.RESULTS, function(e) {
        console.log(e.results);
        if (e.results && e.results.split(',')[0]) {
            var opts = {
                options : e.results.split(','),
                title : 'Possible interpretations'
            };
            Ti.UI.createOptionDialog(opts).show();
        } else
            Ti.UI.createNotification({
                message : 'Nothing to understand …'
            }).show();
        speechrecognizer.stop();

    });
    if (!torch.isSupported())
        win.close();
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
    var crons = [];
    /*var cron = setInterval(function() {
     var torch = require('ti.light');
     torch.turnOn();
     setTimeout(function() {
     torch.turnOff();
     }, 10);

     }, 500);
     crons.push(cron);*/
    win.addEventListener('close', function() {
        crons.forEach(function(cron) {
            clearInterval(cron);
            torch.turnOff();
        });
    });
    torch.isSupported() && torch.turnOff();
    win.addEventListener('open', function() {
        abx.title = "L u m i d i u m";
        abx.subtitle = "morse factory";
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
    speechrecognizer.setAction(1);
    speechrecognizer.start();
    return win;
};
