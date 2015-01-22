module.exports = function(args) {
	args.window.add(Ti.UI.createImageView({
		image : args.preview,
		zIndex : -1,
		width : Ti.UI.FILL,
		height : Ti.UI.FILL
	}));
	args.window.open();
	var web = Ti.UI.createWebView({
		url : 'http://vimeo.com/' + args.id + '?_=' + Math.random(),
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
		args.window.remove(web);
		web = null;
		if (data_config_url) {
			var data_config_url = data_config_url[1].replace(/&amp;/g, '&');
			require('superagent').get(data_config_url).send().set('Referer', 'http://vimeo.com/' + args.id).end(function(res) {
				Ti.UI.createNotification({
					message : 'VideoURL on vimeo found.'
				}).show();
				if (res.ok) {
					try {
						var bg = Ti.UI.createImageView({
							image : args.preview,
							width : Ti.UI.FILL,
							height : Ti.UI.FILL,
							zIndex : 9999
						});
						args.window.add(bg);
						var video = JSON.parse(res.xhr.responseText).request.files.h264.sd.url;
						var player = Ti.Media.createVideoPlayer({
							autoplay : true,
							url : video,
							mediaControlStyle : Ti.Media.VIDEO_CONTROL_DEFAULT,
							scalingMode : Ti.Media.VIDEO_SCALING_MODE_FILL
						});

						player.addEventListener('complete', function() {
							args.window.close();
						});
						player.addEventListener('playing', function() {
							bg.animate({
								opacity : 0,
								duration : 3000
							});
							args.window.add(Ti.UI.createImageView({
								image : '/images/vimeo.png',
								top : 5,
								right : 5,
								zIndex : 9999,

								width : 90,
								height : 20
							}));
						});

						args.window.add(player);

						/*args.window.add(Ti.UI.createLabel({
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
			args.window.close();
	});
	args.window.add(web);
};
