module.exports = function(id) {
	var self = Ti.UI.createTableViewRow({
		//hasChild : true,
		itemId : id
	});
	var xhr = Ti.Network.createHTTPClient({
		onload : function() {
			var video = JSON.parse(this.responseText);
			self.htmlstring = video.html;
			self.thumb = video["thumbnail_url"];
			var container = Ti.UI.createView({
				left : 110,
				top : 0,
				touchEnabled : false,
				layout : 'vertical'
			});
			self.add(container);
			self.add(Ti.UI.createImageView({
				left : 0,
				top : 10,
				width : 100,
				height : 80,
				bottom : 5,
				touchEnabled : false,
				image : video["thumbnail_url"]
			}));
			self.add(Ti.UI.createImageView({
				left : 30,
				top : 40,
				width : 30,
				height : 30,
				touchEnabled : false,
				image : '/images/play.png'			}));

			container.add(Ti.UI.createLabel({
				text : video.title.trim().replace(/^[\s+]/g, ''),
				color : '#fff',
				textAlign : 'left',
				width : Ti.UI.FILL,
				touchEnabled : false,
				top : 10,
				font : {
					fontSize : 24,
					fontFamily : 'Ayherre'
				}
			}));
			container.add(Ti.UI.createLabel({
				text : video.description,
				color : '#fff',
				top : 5,
				right : 10,
				textAlign : 'left',
				width : Ti.UI.FILL,

				touchEnabled : false,
				font : {
					fontSize : 10,
					fontFamily : 'DroidSans'
				}
			}));
		}
	});
	xhr.open('GET', 'http://vimeo.com/api/oembed.json?url=http%3A//vimeo.com/' + id);
	xhr.send();
	return self;
};
