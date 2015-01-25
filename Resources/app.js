! function() {
    var screenheight = Ti.Platform.displayCaps.platformHeight,
        screenwidth = Ti.Platform.displayCaps.platformWidth;
    if (Ti.Android) {
        screenheight *= (160 / Ti.Platform.displayCaps.ydpi);
        screenwidth *= (160 / Ti.Platform.displayCaps.xdpi);
    }
    var intro = Ti.UI.createWindow({
        theme : 'Theme.NoActionBar',
        fullscreen : true,
        backgroundColor : 'black'
    });
    var main = require('maintabgroup')();
    var lumi = Ti.UI.createImageView({
        image : '/images/lumi.png',
        bottom : 0,
        width : Ti.UI.FILL,
        height : Ti.UI.SIZE
    });
    intro.add(lumi);
    var center = {
        y : '40%',
        x : '50%'
    };
    var kernel = Ti.UI.createImageView({
        image : '/images/logokernel.png',
        width : screenwidth * 0.27,
        height : Ti.UI.SIZE,
        center : center

    });
    var empty = Ti.UI.createImageView({
        image : '/images/logoempty.png',
        width : screenwidth * 1,
        height : Ti.UI.SIZE,
        center : center
    });

    empty.animate({
        transform : Ti.UI.create2DMatrix().rotate(720),
        duration : 1500
    }, function() {
        require('vendor/versionsreminder')();
        main.open();
    });
    kernel.animate({
        transform : Ti.UI.create2DMatrix().rotate(-360),
        duration : 1500
    });
    intro.add(empty);
    intro.add(kernel);
    intro.open();

}();
