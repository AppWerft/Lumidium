/*
 Copyright Rainer Schleevoigt
 License MIT.

 */
module.exports = function(videoId, callback) {
	/*	var request = require('superagent');
	 request.get('http://vimeo.com/' + videoId).send().set('Accept', 'application/text').end(function(res) {
	 if (res.ok) {
	 console.log(res.body);
	 } else {
	 alert('Oh no! error ' + res.text);
	 }
	 });
	 return;
	 */

	
	var xhr = Ti.Network.createHTTPClient({
		onload : function(e) {
			console.log(this.status);
			console.log(this.responseText);
			var regex = /data\-config\-url="(.*?)"/gm;
			var data_config_url = regex.exec(this.responseText);
			if (data_config_url) {
				console.log(data_config_url[1].replace('&amp;', '&'));
			}
		},
		onerror : function(e) {
			console.log(e);
		}
	});
	xhr.open("GET", 'http://vimeo.com/' + videoId);
	xhr.setRequestHeader('User-Agent', 'Mozilla/5.0');
	xhr.send();
};

