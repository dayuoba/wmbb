/**
 * A module for managing routers.
 */
module.exports = function (App) {
	
	function Router(path, config) {
		
		var defaultConfig = {};
		this.path = path;
		this.component = undefined;
		this.roles = config.roles;
		this.types = config.types;
		this.config = _.extend({}, defaultConfig, config || {});
	}

	Router.prototype.getComponent = function () {
		
		if (this.component) return this.component;
		var component = undefined;
		if (_.isUndefined(this.config.component)) {
			component = App.Component.get(this.path);
		} else if (_.isString(this.config.component)) {
			component = App.Component.get(this.config.component);
		} else {
			component = {
				view: function () { return m('', 'NO COMPONENT'); }
			};
		}
		
		return this.component = component;
	};

	Router.prototype.allow = function () {
		
		var user = App.Model.get('session').currentUser();
		if (!user) return false;
		
		if (_.isArray(this.roles)) {
			if (!_.includes(this.roles, user.role)) return false;
		} else if (_.isFunction(this.roles)) {
			if (!this.roles(user.role)) return false;
		}
		
		if (user.isMedia()) {
			if (_.isArray(this.types)) {
				if (!_.includes(this.types, user.type)) return false;
			} else if (_.isFunction(this.types)) {
				if (!this.types(user.type)) return false;
			}
		}
		
		return true;
	};
	
	var routingConfig = {
		'home': {
			// 概况
		}
	};
	
	return _.mapValues(routingConfig, function (config, path) {
		return new Router(path, config);
	});
	
};

