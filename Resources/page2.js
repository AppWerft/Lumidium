module.exports = function() {
    var win = require('w')();
    win.image = Ti.UI.createView({
        index : 0,
        width : Ti.UI.FILL,
        height : Ti.UI.FILL,
    });
    win.add(win.image);
    require('vendor/gitimage')({
        view : win.image,
        repo : 'AppWerft/Lumidium',
        file : 'held0.png'
    });
    var cron = setInterval(function() {
        win.image.index++;
        win.image.index %= 11;
        var file = 'held' + win.image.index + '.png';
        require('vendor/gitimage')({
            view : win.image,
            repo : 'AppWerft/Lumidium',
            file : file
        });
    }, 1500);
    win.addEventListener('close', function() {
        clearInterval(cron);
    });
    win.open();
};
