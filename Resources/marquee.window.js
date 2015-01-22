var screenheight = Ti.Platform.displayCaps.platformHeight,
    screenwidth = Ti.Platform.displayCaps.platformWidth;
if (Ti.Android) {
	screenheight *= (160 / Ti.Platform.displayCaps.ydpi);
	screenwidth *= (160 / Ti.Platform.displayCaps.xdpi);
}

module.exports = function() {
	var self = require('w')();
	self.backgroundColor = 'black';
	/*var container = Ti.UI.createWebView({
	 url : '/marquee.html',

	 enableZoomControls : false
	 });*/
	var container = Ti.UI.createScrollView({
		scrollType : 'horizontal',
		height : Ti.UI.FILL,
		width : Ti.UI.FILL,
		contentWidth : Ti.UI.SIZE
	});
	self.add(container);
	var message = Ti.UI.createLabel({
		text : ' Bitte noch so einen vorzueglichen Wein     ',
		touchEnabled : false,
		color : '#ff9',
		width : Ti.UI.SIZE,
		font : {
			fontSize : screenwidth,
			fontFamily : 'Sigward'
		}
	});
	var x=0;
	container.add(message);
	function marquee() {
		message.setLeft(x);
		x -=18;
	}

	setInterval(marquee,500);
	return self;

};
