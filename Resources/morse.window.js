var Crouton = require('de.manumaticx.crouton');
var Draggable = require('ti.draggable');
var abx = require('com.alcoapps.actionbarextras');
var SpeechRecognizerModule = require('jp.isisredirect.speechrecognizer');
var SpeechRecognizer = SpeechRecognizerModule.createSpeechRecognizer({
    action : 1
});
SpeechRecognizer['language_preference'] = Ti.Locale.getCurrentLocale();

var morse = require('morse');

var rows = [],
    micro;
var list = Ti.UI.createTableView({
    data : rows,
    top : 0,
    height : Ti.UI.FILL
});

module.exports = function() {
    var callbacks = {
        event : function(e) {
            console.log(e);
        },
        error : function(e) {
            if (e.error == 5 || e.error == undefined)
                return;
            Crouton.alert(e.type + ":" + e.error + " " + e.errormessage + "\n");
            micro && micro.animate({
                bottom : -800
            });
            SpeechRecognizer && SpeechRecognizer.stop();
        },
        endofspeech : function(e) {
            micro && micro.animate({
                bottom : -800
            });
            //SpeechRecognizer && SpeechRecognizer.stop();
        },
        readyforspeech : function(e) {
            Crouton.info("Ready for speech");
        },
        results : function(e) {
            console.log(e.results);
            micro && micro.animate({
                bottom : -800
            });
            if (e.results && e.results.split(',')[0]) {
                var text = e.results.split(',')[0];
                var listdata = Ti.App.Properties.getList('MORSES') || [];
                listdata.unshift(text);
                Ti.App.Properties.setList('MORSES', listdata);
                var row = require('morse.row')(text);
                rows.unshift(row);
                console.log(rows);
                list.setData(rows);
            }
            SpeechRecognizer.stop();

        }
    };

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
    win.add(list);
    var blitz = Draggable.createView({
        backgroundImage : 'images/flash.png',
        width : 100,
        left : 50,
        top : 50,
        height : 100
    });
    win.add(blitz);

    micro = Ti.UI.createImageView({
        image : '/images/micro.png',
        height : Ti.UI.SIZE,
        width : '80%',
        opacity : 0.8,
        bottom : -800
    });
    win.add(micro);
    micro.animate({
        bottom : 0,
        duration : 700
    });
    list.addEventListener('click', function(_e) {
        var MorsePlayer = new (require('morse.player'))({
            message : _e.rowData.itemId
        });
    });
    win.addEventListener('startmicro', function() {
        micro.animate({
            bottom : 0,
            duration : 700
        });
        SpeechRecognizer.start();
    });
    win.addEventListener('open', require('morsemenu.widget'));

    win.addEventListener('open', function() {
        SpeechRecognizer.addEventListener(SpeechRecognizerModule.EVENT, callbacks.event);
        SpeechRecognizer.addEventListener(SpeechRecognizerModule.ERROR, callbacks.error);
        SpeechRecognizer.addEventListener(SpeechRecognizerModule.ENDOFSPEECH, callbacks.error);
        SpeechRecognizer.addEventListener(SpeechRecognizerModule.READYFORSPEECH, callbacks.readyforspeech);
        SpeechRecognizer.addEventListener(SpeechRecognizerModule.RESULTS, callbacks.results);
        SpeechRecognizer.start();
    });
    win.addEventListener('close', function() {
        SpeechRecognizer.removeEventListener(SpeechRecognizerModule.EVENT, callbacks.event);
        SpeechRecognizer.removeEventListener(SpeechRecognizerModule.ERROR, callbacks.error);
        SpeechRecognizer.removeEventListener(SpeechRecognizerModule.ENDOFSPEECH, callbacks.endofspeech);
        SpeechRecognizer.removeEventListener(SpeechRecognizerModule.READYFORSPEECH, callbacks.readyforspeech);
        SpeechRecognizer.removeEventListener(SpeechRecognizerModule.RESULTS, callbacks.results);
        //SpeechRecognizer.release();
    });
    return win;
};

