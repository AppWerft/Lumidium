module.exports = function() {
    var self = require('w')();
    self.open();
    self.image = Ti.UI.createView({
        index : 0,
        width : Ti.UI.FILL,
        height : Ti.UI.FILL,
    });
    self.add(self.image);
    require('vendor/gitimage')({
        view : self.image,
        repo : 'AppWerft/Lumidium',
        file : 'held0.png'
    });
    self.cronFunc = function() {
        self.image.index++;
        self.image.index %= 11;
        require('vendor/gitimage')({
            view : self.image,
            repo : 'AppWerft/Lumidium',
            file : 'held' + self.image.index + '.png'
        });
        self.cron = setTimeout(self.cronFunc, 1500);
    };
    self.cron = setTimeout(self.cronFunc, 1500);
};
