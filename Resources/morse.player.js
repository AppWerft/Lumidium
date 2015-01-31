const DIT = 100; const DAH=500; const SPACE=100;
var Torch = require('ti.light');
function sayDit(onready) {
    Torch.turnOn();
    setTimeout(function(){
        Torch.turnOff();
        setTimeout(onready,SPACE);
    },DIT);
}
function sayDah(onready) {
    Torch.turnOn();
    setTimeout(function(){
        Torch.turnOff();
        setTimeout(onready,SPACE);
    },DAH);
}

module.exports  = function(signal) {
    if (!signal) {
        signal = "-- --- .-. ... .";
    }
    var items = signal.split('');    
    items.forEach(function(item){
        switch (item) {
            case '.':
            break;
            case '-':
            break;
            default:
            break;
        }
    });   
};
