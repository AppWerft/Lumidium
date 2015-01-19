module.exports = function() {
	var self = Ti.UI.createWindow({
		fullscreen : true,
		navBarHidden : true,
		orientationModes : [Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT]
	});
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
	container.add(message);
	function marquee() {
		console.log('Start animation');
		message.setLeft(0);
		message.animate({
			left : -1.5 * screenheight,
			//autoreverse:true,
			repeat : 10,
			duration : 20000
		});
	}

	marquee();
	return self;
}; 