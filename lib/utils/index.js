module.exports = function(Application) {
	var _utils = {
		auth: require('./auth.js')(Application),
		router: require('./router.js')(Application),
		cache: require('./cache.js')(Application),
		date: require('./date.js')(Application),
		modal: require('./modal.js')(Application),
		defer: require('./defer.js')(Application),
	};

	var Util = {};

	Util.get = function(name) {
		return _utils[name];
	};

	Util.getUtils = function(key, value) {
		return _utils;
	};

	return Util;
};