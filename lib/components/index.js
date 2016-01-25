module.exports = function(Application) {
	var _modules = {
		main: require('./layout/main.js')(Application),
		home: require('./home.js')(Application),
		login: require('./login.js')(Application),
	};

	var Components = {};

	Components.get = function(name) {
		return _modules[name];
	};

	Components.getModules = function() {
		return _modules;
	};

	Components.setView = function(key, value) {
		_modules[key].view = value;
	};

	return Components;
};