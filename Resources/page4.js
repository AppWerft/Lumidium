module.exports = function() {
    var self = require('w')();
    self.image = Ti.UI.createView({
        width:Ti.UI.FILL,
        height:Ti.UI.FILL,
    });
    self.open();
    require('vendor/gitimage')({
        view : self.image,
        repo : 'AppWerft/Lumidium',
        file : 'bille0.png'
    });
    if (Ti.Geolocation.hasCompass) {
        Ti.UI.createNotification({
            message : 'Found compass: you can control the illumination by turning your self'
        }).show();
        Ti.Geolocation.purpose = 'Get Current Heading';
        var oldindex = 0;
        var compassHandler = function(e) {
            if (e.success === undefined || e.success) {
                var ndx = Math.floor(e.heading.magneticHeading / 360 * 10);
                if (oldindex != ndx) {
                    require('vendor/gitimage')({
                        view : self.image,
                        repo : 'AppWerft/Lumidium',
                        file : 'bille' + ndx + '.png'
                    });
                    oldindex = ndx;
                }
            } else {
                console.log(e);
            }
        };
        Ti.Geolocation.getCurrentHeading(function(e) {
            console.log('Heading');
            Ti.API.info(e.heading);
        });
        Ti.Geolocation.addEventListener("heading", compassHandler);
        /*self.addEventListener('close', function() {
            Ti.Geolocation.removeEventListener("heading", compassHandler);

        });*/
    } else {
        require('vendor/gitimage')({
            view : self.image,
            repo : 'AppWerft/Lumidium',
            file : 'bille0.png'
        });
        self.imageindex = 0;
        self.cronFunc = function() {
            self.image.index++;
            self.image.index %= 11;
            require('vendor/gitimage')({
                view : self.image,
                repo : 'AppWerft/Lumidium',
                file : 'bille' + self.imageindex + '.png'
            });
            self.cron = setTimeout(self.cronFunc, 1500);
        };
        self.cron = setTimeout(self.cronFunc, 1500);
    }
    self.add(self.image);

};
