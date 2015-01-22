module.exports = function() {
	var self = require('w')();
	var get_yt_clip = require('vendor/get_yt_clip');
	get_yt_clip('RpDenGL8oAw', function(_res) {
		if (_res != null) {
			var url = _res.streamurl;
			var bg = Ti.UI.createImageView({
				width : Ti.UI.FILL,
				height : Ti.UI.FILL,
				image : _res.meta['thumbnail_for_watch'].replace('w=320&h=192', 'w=960&h=720')
			});
			self.add(bg);
			self.videoplayer = Ti.Media.createVideoPlayer({
				mediaControlStyle : Ti.Media.VIDEO_CONTROL_DEFAULT,
				scalingMode : Ti.Media.VIDEO_SCALING_ASPECT_FIT,
				autoplay : true,
				width : Ti.UI.FILL,
				height : Ti.UI.FILL,
				url : url
			});
			self.add(self.videoplayer);
			self.add(Ti.UI.createImageView({
				top : 15,
				right : 5,
				opacity : 0.4,
				zIndex : 9999,
				image : '/images/youtube.png',
				width : 40,
				height : 40
			}));
			self.videoplayer.addEventListener('complete', function() {
				self.close();
			});
		}
	});
	self.open();
}; 