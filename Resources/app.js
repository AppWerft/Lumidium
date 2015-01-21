Ti.UI.setBackgroundColor('#000');
require('vendor/versionsreminder')();
var torch = require('ti.light');
var win = Titanium.UI.createWindow({
	fullscreen : true,
	exitOnClose : true,
	backgroundColor : 'black'
});
var abx = require('com.alcoapps.actionbarextras');
var bg = Ti.UI.createImageView({
	bottom : 0,
	width : Ti.UI.FILL,
	image : '/images/bg.png'
});
win.add(bg);
setInterval(function() {
	bg.animate({
		opacity : Math.random(),
		duration : 2000
	});
}, 2000);
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
var flipcontainer = FlipModule.createFlipView({
	orientation : FlipModule.ORIENTATION_HORIZONTAL,
	overFlipMode : FlipModule.OVERFLIPMODE_GLOW,
	views : pages,
	currentPage : 2,
	height : Ti.UI.FILL,
});
win.add(flipcontainer);
flipcontainer.addEventListener('flipped', function(_e) {
	Ti.App.Properties.setString('LAST', flipcontainer.currentPage);
});
var imageindex = 0;
flipcontainer.flipToView(Ti.App.Properties.hasProperty('LAST') ? Ti.App.Properties.getString('LAST') : 0);
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
for (var i = 1; i < 5; i++)
	pages[i].image.addEventListener('click', require('page' + i));
win.addEventListener('open', function() {
	require('expansionfiles.events')();
	Ti.Accelerometer.addEventListener('update', onUpdateFunc);
	abx.title = "L u m i d i u m";
	abx.subtitle = "the element of light";
	abx.titleFont = "Sigward.ttf";
	abx.titleColor = "#ff9";
	var activity = win.getActivity();
	if (activity) {
		activity.onCreateOptionsMenu = function(e) {
			e.menu.clear();
			e.menu.add({
				title : 'vimeo',
				icon : Ti.App.Android.R.drawable.ic_action_v,
				showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
			}).addEventListener("click", function(_e) {
				require('vimeo.window')().open();
			});
			e.menu.add({
				title : 'FLASH',
				icon : Ti.App.Android.R.drawable.ic_action_flash,
				showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
			}).addEventListener("click", function(_e) {
				torch.toggle();
			});
			data.forEach(function(item, i) {
				e.menu.add({
					title : item.title,
					showAsAction : Ti.Android.SHOW_AS_ACTION_NEVER,
					itemId : i
				}).addEventListener("click", function(_e) {
					flipcontainer.flipToView(_e.source.itemId);
					console.log(_e.source.itemId);
					activity.invalidateOptionsMenu();
				});
			});
		};
	}
});
win.addEventListener('close', function() {
	Ti.Accelerometer.removeEventListener('update', onUpdateFunc);
});

