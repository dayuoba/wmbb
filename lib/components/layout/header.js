module.exports = function(App) {

	var m = App.m;

	var Header = {
		_selfView: false
	};

	Header.controller = function() {
		var vm = {};

		return vm;
	};

	return Header;
};
