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

module.exports  = function(signal) {
    if (!signal) {
        signal = "-- --- .-. ... .";
    }
    function sayItem(item) {
        switch (item) {
            case '.':
                sayDit(sayItem);
            break;
            case '-':
                sayDah(sayItem);
            break;
            default:
                sayBreak(sayItem);
            break;
        }
    }        
    signal.split('').forEach(sayItem);   
};
