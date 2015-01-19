// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');
var abx = require('com.alcoapps.actionbarextras');
// create tab group
var win = Titanium.UI.createWindow({
	fullscreen : true,
	exitOnClose : true,
	backgroundColor : 'black'

});
var bg = Ti.UI.createImageView({
	bottom : 0,
	width : Ti.UI.FILL,
	image : '/images/bg.png'
});
/*var bg = Ti.UI.createWebView({
 url : 'spread.html',
 borderRadius : 1,
 bottom : 0,
 width : Ti.UI.FILL,
 height : '50%'
 });
 */
win.add(bg);

win.open();

var screenheight = Ti.Platform.displayCaps.platformHeight,
    screenwidth = Ti.Platform.displayCaps.platformWidth;

if (Ti.Android) {
	screenheight *= (160 / Ti.Platform.displayCaps.ydpi);
	screenwidth *= (160 / Ti.Platform.displayCaps.xdpi);
}

var pages = [];

var data = require('pagedata');

data.forEach(function(item) {
	pages.push(require('page.widget')(item));
});

var FlipModule = require('de.manumaticx.androidflip');
var self = FlipModule.createFlipView({
	orientation : FlipModule.ORIENTATION_HORIZONTAL,
	overFlipMode : FlipModule.OVERFLIPMODE_GLOW,
	views : pages,
	currentPage : 2,
	height : Ti.UI.FILL,

});

win.add(self);
self.addEventListener('flipped', function(_e) {

});
var imageindex = 0;

self.flipToView(Ti.App.Properties.hasProperty('LAST') ? Ti.App.Properties.getString('LAST') : 0);
setInterval(function() {
	imageindex++;
	imageindex %= 22;
	require('vendor/gitimage')({
		view : pages[0].image,
		repo : 'AppWerft/Lumidium',
		file : 'v' + imageindex + '.png'
	});
}, 2500);

var onUpdateFunc = function(_e) {
	bg.setBottom(5 * _e.y - 100);
	pages.forEach(function(page) {
		page.children[1].left = 50 + _e.x;
	});

};

win.addEventListener('close', function() {
	Ti.Accelerometer.removeEventListener('update', onUpdateFunc);

});
win.addEventListener('open', function() {
	require('expansionfiles.events')();

	/*
	 require('ti.expansionfiles').downloadXAPKs({
	 mainFile : {
	 version : 4,
	 size : 26154938
	 }
	 });
	 */
	Ti.Accelerometer.addEventListener('update', onUpdateFunc);
});

pages[1].image.addEventListener('click', function() {
	var views = [];
	for (var i = 0; i < 9; i++) {
		views.push(Ti.UI.createImageView({
			image : '/images/mystique' + i + '.png'
		}));
	}
	var scroller = Ti.UI.createScrollableView({
		bubbleParent : false,
		views : views
	});
	pages[1].add(scroller);
});
pages[2].image.addEventListener('click', function() {
	var win = Ti.UI.createWindow({
		fullscreen : true,
		orientationModes : [Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT]
	});
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
});

pages[3].image.addEventListener('click', function() {
	var win = Ti.UI.createWindow({
		fullscreen : true,
		orientationModes : [Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT]
	});
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
});

pages[4].image.addEventListener('click', function() {
	var win = Ti.UI.createWindow({
		fullscreen : true,
		orientationModes : [Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT]
	});
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
});
var get_yt_clip = require('vendor/get_yt_clip');
get_yt_clip('RpDenGL8oAw', function(_res) {
	if (_res != null) {
		console.log(_res.streamurl);
	}
});
win.addEventListener('close', function() {
	Ti.App.Properties.setString('LAST', self.currentPage);
});
win.addEventListener('open', function() {
	abx.title = "L u m i d i u m";
	abx.subtitle = "Illumination";
	abx.titleFont = "Sigward.ttf";
	abx.titleColor = "#ff9";
	var activity = win.getActivity();
	if (!activity.actionBar)
		return;
	activity.actionBar.setDisplayHomeAsUp(false);

	activity.onCreateOptionsMenu = function(e) {
		/*e.menu.add({
			title : 'ABC',
			icon : Ti.App.Android.R.drawable.ic_action_abc,
			showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
		}).addEventListener("click", function(_e) {
			var win = require('marquee.window')();
			win.open();
		});*/
		data.forEach(function(item, i) {
			e.menu.add({
				title : item.title,
				showAsAction : Ti.Android.SHOW_AS_ACTION_NEVER,
				itemId : i
			}).addEventListener("click", function(_e) {
				self.flipToView(_e.source.itemId);
				console.log(_e.source.itemId);
				activity.invalidateOptionsMenu();
			});

		});

	};
	activity.invalidateOptionsMenu();

});
require('vendor/versionsreminder')();
