module.exports = function() {
	var self = Ti.UI.createWindow({
		fullscreen : true,
		theme : 'Theme.NoActionBar',
		orientationModes : [Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT]
	});
	return self;
};

