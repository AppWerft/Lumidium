const TIME = {
    DIT : 50,
    DAH : 200,
    SPACE : 100
};
var Torch = require('ti.light');
var morse = require('morse');

function sayDit(onready) {
    Torch.turnOn();
    setTimeout(function() {
        Torch.turnOff();
        setTimeout(onready, TIME.SPACE);
    }, TIME.DIT);
}

function sayDah(onready) {
    Torch.turnOn();
    setTimeout(function() {
        Torch.turnOff();
        setTimeout(onready, TIME.SPACE);
    }, TIME.DAH);
}

function sayBreak(onready) {
    setTimeout(onready, TIME.SPACE);
}

/*
 Parameters:
 message : text, will automaticly coded to morse code
 onready : optional ready callback
 */

module.exports = function() {
    var args = arguments[0] || {};
    var message = "";
    if (args.message) {
        message = args.message;
    } else {
        message = "morsecode";
    }
    var morsecode = "";
    for (var i = 0; i < message.length; i++) {
        morsecode += morse[message[i].toLowerCase()];
    }
    function sayNext() {
        var item = items.shift();
        if (item) {
            sayItem(item);
        }
    }
    function sayItem(item) {
        if (item == undefined)
            return;
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

    var items = morsecode.split("");
    sayNext();
};
