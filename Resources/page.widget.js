module.exports = function(item) {
	var page = Ti.UI.createView({
	});
	page.image = Ti.UI.createView({
		backgroundImage : item.image,
		width : screenwidth,
		height : screenwidth * 0.8,
		top : 0
	});
	page.add(page.image);

	page.add(Ti.UI.createLabel({
		text : item.title,
		top : screenwidth * 0.8+5,
		touchEnabled : false,
		color : '#ff6',textAlign:'left',
		width : Ti.UI.FILL,
		left : -15,
		right : 5,

		font : {
			fontSize : 56,
			fontFamily : 'Sigward'
		}
	}));
	page.add(Ti.UI.createLabel({
		text : item.subtitle,
		bottom : 20,
		touchEnabled : false,
		color : '#fff',
		width : Ti.UI.FILL,
		left : 20,
		right : 20,
		font : {
			fontSize : 12,
			fontFamily : 'DroidSans'
		}
	}));
	return page;
};