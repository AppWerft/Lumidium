module.exports = function() {
	Ti.UI.setBackgroundColor('#000');
	require('vendor/versionsreminder')();

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
	win.add(bg);
	setInterval(function() {
		bg.animate({
			opacity : Math.random(),
			duration : 2000
		});
	}, 2000);
	win.open();
	var pages = [];
	win.data = require('pagedata');
	win.data.forEach(function(item) {
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

	win.addEventListener('open', require('menu.widget'));

	win.addEventListener('open', function() {
		Ti.Accelerometer.addEventListener('update', onUpdateFunc);
	});

	win.addEventListener('close', function() {
		Ti.Accelerometer.removeEventListener('update', onUpdateFunc);
	});

};
