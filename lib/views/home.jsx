module.exports = function(App) {
	var m = App.m;
	
	return function view(vm) {
		return m('.content.home', [
				m('h1', 'Welcome WMBB'),
				m('p', 'Here is your webpack-mithril-bootstrap-boilderplate :)')
		]);
	}
};