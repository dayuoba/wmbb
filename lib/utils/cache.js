module.exports = function (App) {
	/**
	 * cache 模块 基本功能
	 * @type {Object}
	 */
	var _values = {};

	var cache = {};
	/**
	 * get single cache;
	 * @param {String} key
	 * @returns {Object}
	 */
	cache.get = function (key) {
		return _values[key];
	};
	/**
	 * pub something into cache.
	 * @param {String} key
	 * @param {Object || String} subkey - if value is undefined, subkey == value;
	 * @param {*} value - anything you want to cache.
	 */
	cache.put = function (key, subkey, value) {
		if (value === undefined) {
			value = subkey;
			_values[key] = value;
		} else {
			if (!_values[key])	{
				_values[key] = {};
			}
			_values[key][subkey] = value;
		}
	};
	/**
	 * clear all cache.
	 */
	cache.clear = function () {
		_values = {};
	};
	/**
	 * is cached?
	 * @param {String} key
	 * @param {String} [subkey]
	 * @returns {boolean}
	 */
	cache.cached = function (key, subkey) {
		if (this.get(key) == undefined) {
			return false;
		}

		return !(subkey && (this.get(key)[subkey] == undefined));
	};
	/**
	 * it is for using cache a promise style
	 * make sure we cached it before
	 * @param {String} key
	 * @param {String} [subkey]
	 * @returns {Promise}
	 */
	cache.deferred = function (key, subkey) {
		var deferred = App.m.deferred();
		if (subkey) {
			deferred.resolve(cache.get(key)[subkey]);
		} else {
			deferred.resolve(cache.get(key));
		}
		return deferred.promise;
	};
	/**
	 * update cache.
	 * @param {String} key
	 * @param {*} value - anything you want to cache.
	 * @param {boolean} force - if it is true, override
	 */
	cache.update = function (key, value, force) {
		if (this.cached[key] && force) {
			_values[key] = value;
		} else if (!this.cached[key]) {
			_values[key] = value;
		}
	};
	/**
	 * delete from cache. always success.
	 * @param {String} key
	 * @param {String} subkey
	 */
	cache.delete = function (key, subkey) {
		if (this.get(key) === undefined)	{
			return;
		}

		if (!subkey) {
			_values[key] = undefined;
			return;
		}

		if (this.get(key)[subkey] !== undefined) {
			_values[key][subkey] = undefined;
		}

	};

	return cache;
};
