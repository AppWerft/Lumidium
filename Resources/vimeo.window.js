module.exports = function() {
	var win = Titanium.UI.createWindow({
		fullscreen : true,
		backgroundColor : 'black'
	});
	var abx = require('com.alcoapps.actionbarextras');
	abx.window = win;
	var ids = [];
	var sections = [];
	var data = require('vimeo.data');
	require('vendor/remotexmljson')({
		url : 'http://vimeo.com/lumidium/videos/rss',
		onload : function(_e) {
			console.log(_e);
		}
	});

	for (key in data) {
		var section = Ti.UI.createTableViewSection({
			headerTitle : key
		});
		data[key].forEach(function(id) {
			section.add(require('vimeo.row')(id));
		});
		sections.push(section);
	};

	var list = Ti.UI.createTableView({
		data : sections
	});
	win.add(list);
	win.addEventListener('open', function() {
		abx.title = "L u m i d i u m";
		abx.subtitle = "the vimeo channel";
		abx.titleFont = "Sigward.ttf";
		abx.titleColor = "#ff9";
		var activity = win.getActivity();
		if (!activity.actionBar)
			return;
		activity.actionBar.setDisplayHomeAsUp(true);
		activity.actionBar.onHomeIconItemSelected = function() {
			win.close();
		};
	});
	list.addEventListener('click', function(_e) {
		require('vendor/vimeoplayer')({
			window : require('w')(),
			preview : _e.row.thumb,
			id : _e.row.itemId
		});
	});
	return win;
};
