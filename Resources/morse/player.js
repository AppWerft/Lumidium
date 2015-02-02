const TIME = {
    DIT : 50,
    DAH : 150,
    SPACE : 150
};
var Torch = require('ti.light');

/*
 Parameters:
 message : text, will automaticly coded to morse code
 onready : optional ready callback
 */

var MorseModule = function() {
    var args = arguments[0] || {};
    var torchavailable;
    var self = this;
    var window;
    var message = "";
    this.window = 'window';
    if (args.message) {
        message = args.message;
    } else {
        message = "morsecode";
    }
    var morsecode = "";
    for (var i = 0; i < message.length; i++) {
        morsecode += require('morse/code')[message[i].toLowerCase()];
    }
    function sayDit(onready) {
        Torch.turnOn();
        window.backgroundColor = 'white';
        setTimeout(function() {
            window.backgroundColor = 'black';
            Torch.turnOff();
            setTimeout(onready, TIME.SPACE);
        }, TIME.DIT);
    }

    function sayDah(onready) {
        Torch.turnOn();
        window.backgroundColor = 'white';
        setTimeout(function() {
            Torch.turnOff();
            window.backgroundColor = 'black';
            setTimeout(onready, TIME.SPACE);
        }, TIME.DAH);
    }

    function sayBreak(onready) {
        setTimeout(onready, TIME.SPACE);
    }

    function sayNext() {
        var item = items.shift();
        if (item) {
            sayItem(item);
        }
        window.close();
    }

    function sayItem(item) {
        if (item != undefined) {
            switch (item) {
            case '.':
                sayDit(sayNext);
                break;
            case '-':
                sayDah(sayNext);
                break;
            case ' ' :
                sayBreak(sayNext);
                break;
            default:
                args.onready && args.onready();
                break;
            }
        }
    }

    var items = morsecode.split("");
    window = Ti.UI.createWindow({
        theme : 'Theme.NoActionBar',
        fullscreen : true,
        backgroundColor : 'black'
    });
    if (Ti.Platform.model.match(/nexus/i) || !Torch.isSupported()) {
        Ti.UI.createNotification({
            message : 'This ' + Ti.Platform.model + ' doesn\'t support flash light.'
        }).show();
        torchavailable = false;

    } else
        torchavailable = true;
    window.open();
    sayNext();
    return this;
};

module.exports = MorseModule;
