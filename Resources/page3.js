module.exports = function() {
	var win = require('w')();
	win.image = Ti.UI.createView({
	});
	win.imageindex = 0;
	require('vendor/gitimage')({
		view : win.image,
		repo : 'AppWerft/Lumidium',
		file : 'lichwark0.png'
	});
	win.add(win.image);
	var onSwipeFunc = function() {
		win.imageindex++;
		win.imageindex %= 18;
		require('vendor/gitimage')({
			view : win.image,
			repo : 'AppWerft/Lumidium',
			file : 'lichwark' + +win.imageindex + '.png'
		});
	};

	win.image.addEventListener('swipe', onSwipeFunc);
	win.addEventListener('close', function() {
		win.image.removeEventListener('swipe', onSwipeFunc);
	});
	win.open();
};
