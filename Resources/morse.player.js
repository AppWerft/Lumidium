const TIME = {DIT : 100, DAH : 500, SPACE : 100};
var Torch = require('ti.light');
function sayDit(onready) {
    Torch.turnOn();
    setTimeout(function(){
        Torch.turnOff();
        setTimeout(onready,TIME.SPACE);
    },TIME.DIT);
}
function sayDah(onready) {
    Torch.turnOn();
    setTimeout(function(){
        Torch.turnOff();
        setTimeout(onready,TIME.SPACE);
    },TIME.DAH);
}
function sayBreak(onready) {
    setTimeout(onready,TIME.SPACE);
}

module.exports  = function(args) {
    var message;
    if (args.message) { 
        message = args.message; 
    } else {
        message = "-- --- .-. ... .";
    }
    function sayItem(item) {
        if (item == undefined) return;
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
    var items = message.split('');
    function sayNext() {
        var item = items.shift();  
        if (item) {
            sayItem(item);
        } 
    }
    sayNext();
};
