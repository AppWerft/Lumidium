const time = {DIT : 100, DAH : 500, SPACE : 100};
var Torch = require('ti.light');
function sayDit(onready) {
    Torch.turnOn();
    setTimeout(function(){
        Torch.turnOff();
        setTimeout(onready,time.SPACE);
    },time.DIT);
}
function sayDah(onready) {
    Torch.turnOn();
    setTimeout(function(){
        Torch.turnOff();
        setTimeout(onready,time.SPACE);
    },time.DAH);
}
function sayBreak(onready) {
    setTimeout(onready,time.SPACE);
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
