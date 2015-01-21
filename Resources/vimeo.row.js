module.exports = function(id) {
	var self = Ti.UI.createTableViewRow({
		hasChild : true,
		itemId : id
	});
	var xhr = Ti.Network.createHTTPClient({
		onload : function() {
			var video = JSON.parse(this.responseText);
			self.htmlstring = video.html;
			self.thumb = video["thumbnail_url"];
			self.add(Ti.UI.createImageView({
				left : 0,
				top : 0,
				width : 120,
				bottom : 5,
				touchEnabled : false,
				height : 80,
				image : video["thumbnail_url"]
			}));
			var container = Ti.UI.createView({
				left : 130,
				top : 0,
				touchEnabled : false,
				layout : 'vertical'
			});
			self.add(container);
			container.add(Ti.UI.createLabel({
				text : video.title.trim().replace(/^[\s+]/g, ''),
				color : '#fff',
				textAlign : 'left',
				width : Ti.UI.FILL,
				touchEnabled : false,
				top : 10,
				font : {
					fontSize : 24,
					fontFamily : 'Sigward'
				}
			}));
			container.add(Ti.UI.createLabel({
				text : video.description,
				color : '#fff',
				top : 5,
				textAlign : 'left',
				width : Ti.UI.FILL,

				touchEnabled : false,
				font : {
					fontSize : 12,
					fontFamily : 'DroidSans'
				}
			}));
		}
	});
	xhr.open('GET', 'http://vimeo.com/api/oembed.json?url=http%3A//vimeo.com/' + id);
	xhr.send();
	return self;
};
