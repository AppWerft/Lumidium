var abx = require('com.alcoapps.actionbarextras');
var torch = require('ti.light');

module.exports = function(_e) {
	var data = _e.source.data;
	abx.title = "L u m i d i u m";
	abx.subtitle = "the element of light";
	abx.titleFont = "Sigward.ttf";
	abx.titleColor = "#ff9";
	var activity = _e.source.getActivity();
	if (activity) {
		activity.onCreateOptionsMenu = function(e) {
			e.menu.clear();
			e.menu.add({
				title : 'vimeo',
				icon : Ti.App.Android.R.drawable.ic_action_v,
				showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
			}).addEventListener("click", function(_e) {
				require('vimeo.window')().open();
			});
			e.menu.add({
				title : 'FLASH',
				icon : Ti.App.Android.R.drawable.ic_action_flash,
				showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
			}).addEventListener("click", function(_e) {
				torch.toggle();
				Ti.UI.createNotification({
					message : 'Licht sollte jetzt ' + (torch.isOn() ? 'an' : 'aus') + ' sein.'
				}).show();
			});
			data.forEach(function(item, i) {
				e.menu.add({
					title : item.title,
					showAsAction : Ti.Android.SHOW_AS_ACTION_NEVER,
					itemId : i
				}).addEventListener("click", function(_e) {
					flipcontainer.flipToView(_e.source.itemId);
					activity.invalidateOptionsMenu();
				});
			});
		};
	}
};
