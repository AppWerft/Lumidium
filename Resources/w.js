module.exports = function() {

	var self = Ti.UI.createWindow({
		fullscreen : true,
		orientationModes : [Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT]
	});
	self.addEventListener('open', function() {
		var activity = self.getActivity();
		activity.actionBar.hide();
		if (!activity.actionBar)
			return;
		activity.actionBar.setDisplayHomeAsUp(false);
		activity.onCreateOptionsMenu = function(e) {

		};
		activity.invalidateOptionsMenu();

	});

	return self;
};

