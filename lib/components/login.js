/**
 * A module for login page
 */
module.exports = function (App) {
	var m = App.m;
	
	var Login = {
		_selfView: true
	};
	
	Login.controller = function (args) {
		var vm = {};
		
		return vm;
	};
	
	Login.view = function (vm, args) {
		return m('.login-wrapper', [
				'Login Page'
		]);
	};
	
	return Login;
};