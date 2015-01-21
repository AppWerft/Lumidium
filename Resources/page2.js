module.exports = function() {
	var win = require('w')();
	win.image = Ti.UI.createView({
	});
	require('vendor/gitimage')({
		view : win.image,
		repo : 'AppWerft/Lumidium',
		file : 'held0.png'
	});
	win.imageindex = 0;
	var cron = setInterval(function() {
		win.imageindex++;
		win.imageindex %= 11;
		require('vendor/gitimage')({
			view : win.image,
			repo : 'AppWerft/Lumidium',
			file : 'held' + +win.imageindex + '.png'
		});
	}, 1500);
	win.addEventListener('close', function() {
		clearInterval(cron);
	});
	win.add(win.image);
	win.open();
};
