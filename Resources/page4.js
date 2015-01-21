module.exports = function() {
	var win = require('w')();
	win.image = Ti.UI.createView({
	});
	require('vendor/gitimage')({
		view : win.image,
		repo : 'AppWerft/Lumidium',
		file : 'bille0.png'
	});
	if (Ti.Geolocation.hasCompass) {
		Ti.UI.createNotification({
			message : 'Found compass: you can control the illumination by turning your self'
		}).show();
		var oldindex = 0;
		var compassHandler = function(e) {
			if (e.success === undefined || e.success) {
				var ndx = Math.floor(e.heading.magneticHeading / 360 * 10);

				if (oldindex != ndx) {
					require('vendor/gitimage')({
						view : win.image,
						repo : 'AppWerft/Lumidium',
						file : 'bille' + ndx + '.png'
					});
					oldindex = ndx;
				}
			}
		};
		Ti.Geolocation.addEventListener("heading", compassHandler);
		win.addEventListener('close', function() {
			Ti.Geolocation.removeEventListener("heading", compassHandler);

		});
	} else {
		require('vendor/gitimage')({
			view : win.image,
			repo : 'AppWerft/Lumidium',
			file : 'bille0.png'
		});
		win.imageindex = 0;
		var cron = setInterval(function() {
			win.imageindex++;
			win.imageindex %= 11;
			require('vendor/gitimage')({
				view : win.image,
				repo : 'AppWerft/Lumidium',
				file : 'bille' + win.imageindex + '.png'
			});
		}, 2500);
		win.addEventListener('close', function() {
			clearInterval(cron);
		});
	}
	win.add(win.image);
	win.open();
}; 