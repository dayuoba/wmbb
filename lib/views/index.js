module.exports = function(Application) {
	var Views = {
		_views: {
			header: require('./header.jsx')(Application),
			footer: require('./footer.jsx')(Application),
			navigation: require('./navigation.jsx')(Application),
			home: require('./home.jsx')(Application),
			slot: require('./slot.jsx')(Application),
			advertisers: require('./advertisers.jsx')(Application)
		}
	};
	
	Views.get = function(name) {
		return this._views[name];
	};

	Views.getViews = function(key, value) {
		return this._views;
	};

	return Views;

};


