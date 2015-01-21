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
	});
	list.addEventListener('click', function(_e) {
		var win = require('w')();
		win.add(Ti.UI.createImageView({
			image : _e.row.thumb,
			zIndex : -1,
			width : Ti.UI.FILL,
			height : Ti.UI.FILL
		}));
		win.open();
		var web = Ti.UI.createWebView({
			url : 'http://vimeo.com/' + _e.row.itemId + '?_=' + Math.random(),
			userAgent : 'Mozilla/5.0 (Windows; U; Windows NT 6.1; rv:2.2) Gecko/20110201',
			borderRadius : 1,
			visible : false
		});
		var webloaded = false;
		web.addEventListener('load', function() {
			if (webloaded)
				return;
			webloaded = true;
			var data_config_url = /data\-config\-url="(.*?)"/gm.exec(web.html);
			win.remove(web);
			web = null;
			if (data_config_url) {
				var data_config_url = data_config_url[1].replace(/&amp;/g, '&');
				require('superagent').get(data_config_url).send().set('Referer', 'http://vimeo.com/' + _e.row.itemId).end(function(res) {
					Ti.UI.createNotification({
						message : 'VideoURL on vimeo found.'
					}).show();
					if (res.ok) {
						try {
							var bg = Ti.UI.createImageView({
								image : _e.row.thumb,
								width : Ti.UI.FILL,
								height : Ti.UI.FILL,
								zIndex : 9999
							});
							win.add(bg);
							var video = JSON.parse(res.xhr.responseText).request.files.h264.sd.url;
							var player = Ti.Media.createVideoPlayer({
								autoplay : true,
								url : video,
								mediaControlStyle : Ti.Media.VIDEO_CONTROL_DEFAULT,
								scalingMode : Ti.Media.VIDEO_SCALING_MODE_FILL
							});
							
							player.addEventListener('complete', function() {
								win.close();
							});
							player.addEventListener('playing', function() {
								bg.animate({
									opacity : 0,
									duration : 3000
								});
								win.add(Ti.UI.createImageView({
									image : '/images/vimeo.png',
									top : 5,
									right : 5,
									zIndex : 9999,

									width : 90,
									height : 20
								}));
							});

							win.add(player);

							/*win.add(Ti.UI.createLabel({
							 text : 'Name des Videos',
							 color : '#ff9',
							 font : {
							 fontFamily : 'Sigward',
							 fontSize : 30
							 }
							 }));*/

						} catch(E) {
							console.log(E);
						}
					} else {
						console.log('Warning: no result from ' + data_config_url);
					}
				});
				return;
			} else
				win.close();
		});
		win.add(web);
		return;
	});
	return win;
};
