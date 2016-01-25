/**
 * Proxy of models
 * @param  {[type]} Application [description]
 * @return {[type]}             [description]
 */
module.exports = function(Application) {
	var _models = {
		home: require('./home.js')(Application),
	};

	var Model = {};

	Model.get = function(name) {
		return _models[name];
	};

	Model.getModels = function() {
		return _models;
	};

	return Model;

};