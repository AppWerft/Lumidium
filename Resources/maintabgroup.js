module.exports = function() {
	Ti.UI.setBackgroundColor('#000');
	
	var self = Titanium.UI.createWindow({
		fullscreen : true,
		exitOnClose : true,
		backgroundColor : 'black',
		orientationModes : [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT]
	});

	var bg = Ti.UI.createImageView({
		bottom : 0,
		width : Ti.UI.FILL,
		image : '/images/bg.png'
	});
	self.add(bg);
	setInterval(function() {
		bg.animate({
			opacity : Math.random(),
			duration : 2000
		});
	}, 2000);

	var pages = [];
	self.data = require('pagedata');
	self.data.forEach(function(item) {
		pages.push(require('page.widget')(item));
	});
	var FlipModule = require('de.manumaticx.androidflip');
	self.flipcontainer = FlipModule.createFlipView({
		orientation : FlipModule.ORIENTATION_HORIZONTAL,
		overFlipMode : FlipModule.OVERFLIPMODE_GLOW,
		views : pages,
		currentpage : 0,
		height : Ti.UI.FILL,
	});
	self.add(self.flipcontainer);
	self.flipcontainer.addEventListener('flipped', function(_e) {
		Ti.App.Properties.setString('LAST_PAGEFLIP_POSITION_INDEX', _e.source.currentPage);
	});
	var imageindex = 0;
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
			var animation = Ti.UI.createAnimation({
			transform : Ti.UI.create2DMatrix({
				scale : _e.x/2+.3,
				duration : 50,
				rotate : Math.random() * 3 - 1.80
			})
		});
			page.children[1].left = 10 + _e.x;
			page.children[1].animate(animation);
		});
	};
	for (var i = 1; i < 5; i++) {
		pages[i].image.addEventListener('click', require('page' + i));
	}
	self.addEventListener('open', require('menu.widget'));
	self.addEventListener('open', function() {
		self.flipcontainer.flipToView(Ti.App.Properties.getString('LAST_PAGEFLIP_POSITION_INDEX', 2));
		Ti.Accelerometer.addEventListener('update', onUpdateFunc);
	});
	self.addEventListener('androidback', function() {
		var torch = require('ti.light');
		if (torch.isLighOn)
			torch.toggle();
		Ti.UI.createNotification({
			message : require('com.ionrod.accountmanager').getUserEmail()
		}).show();
		self.close();
	});
	self.addEventListener('close', function() {
		Ti.Accelerometer.removeEventListener('update', onUpdateFunc);
	});
	
	return self;
};
