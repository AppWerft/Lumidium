module.exports = function() {
    var intro = Ti.UI.createWindow({
        theme : 'Theme.NoActionBar',
        fullscreen : true,
    });
    var image = Ti.UI.createImageView({
        images : ['/images/i0.png', '/images/i1.png', '/images/i2.png', '/images/i3.png', '/images/i4.png', '/images/i5.png', '/images/i6.png', '/images/ix.png'],
        width : Ti.UI.FILL,
        duration : 100,
        height : Ti.UI.FILL
    });
    intro.add(image);
    image.start();
    setTimeout(function() {
        image.stop();
        intro.close();
    }, 800);
    return intro;
};
