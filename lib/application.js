var mithril = require('mithril');

/* override m.request to provide default cookie authentication */
mithril._request = mithril.request.bind(mithril);
mithril.request = function(option) {

	if (option && !option.config) {
		option.config = function(xhr) {
			xhr.withCredentials = true;
		};
	}

	return mithril._request(option);
};

/**
 * [MVVM boilerplater with webpack-mithriljs-bootstrap]
 * @type {Object}
 */
var Application = {
	status: null,
	_settings: {},
	m: mithril,
	View: {},
	Model: {},
	Component: {}, //vm
};
/**
 * 程序入口
 * TODO 判断session 如果没有 signed session 转为 /login
 * @return {[type]} [description]
 */
Application.start = function() {

	// Application.Model.get('session').init().then(function(data) {
		Application.setUpRoutes();
		
	// });
};
/**
 * 初始化，做一些基础配置,配置后调用start
 * @param  {[type]} config [description]
 * @return {[type]}		[description]
 */
Application.init = function(config) {
	Application.set('config', config);

	Application.set('CONST', require('./config/constants.js'));

	Application.setUpPath();
	Application.setUpComponents();

	return this;
};
/**
 * Setter Fn
 * @param {[type]} key		   [description]
 * @param {[type]} value		 [description]
 * @param {[type]} selfAttribute [description]
 */
Application.set = function(key, value, selfAttribute) {
	if (selfAttribute) return this[key] = value;
	this._settings[key] = value;
};
/**
 * Getter Fn
 * @param  {[type]} key		   [description]
 * @param  {[type]} selfAttribute [description]
 * @return {[type]}			   [description]
 */
Application.get = function(key, selfAttribute) {
	return selfAttribute ?
			this[key] :
			this._settings[key];
};
/**
 * 程序路径配置
 * configure basic paths
 */
Application.setUpPath = function() {
	this.set('ROOT_PATH', './');
	this.set('COMPONENTS_PATH', this.get('ROOT_PATH') + 'components');
	this.set('VIEW_PATH', this.get('ROOT_PATH') + 'views');
	this.set('MODEL_PATH', this.get('ROOT_PATH') + 'models');
	this.set('UTIL_PATH', this.get('ROOT_PATH') + 'utils');
	this.set('PUBLIC_PATH', this.get('ROOT_PATH') + 'assets');
};
/**
 * 加载基本类，工具，静态样式，Model,View,Components(Mithril)
 */
Application.setUpComponents = function() {
	Application.loadUtils();
	Application.loadStylesheets();
	Application.loadScripts();
	Application.loadModels(this.get('MODEL_PATH'));
	Application.loadViews(this.get('VIEW_PATH'));
	Application.loadComponents(this.get('COMPONENTS_PATH'));
};

//setUpRoutes routes here
Application.setUpRoutes = function() {
	this.m.route.mode = 'hash';

	this.m.route(document.body, "/home", {
		"/login": this.Component.get('login'),
		"/:path...": this.Component.get('main')
	});
};

/**
 * 如果Component的_selfView 为 false的情况下
 * 根据Components在views目录下的同名目录自动挂载view对象到component下，
 */
Application.setUpViews = function() {
	var Components = this.get('Component', true).getModules();
	var Views = this.get('View', true).getViews();

	for (var key in Components) {
		if (!Components._selfView && Views[key]) {
			Components[key].view = Views[key];
		}
	}
};
/**
 * 加载各种工具类
 * 某些工具挂载到window下
 */
Application.loadUtils = function() {
	window._ = require('lodash'); //underscore
	window.$ = window.jQuery = require('jquery/dist/jquery.min.js'); //$
	window.moment = require('moment');

	//bootstrap
	require('bootstrap/dist/js/bootstrap.js');
	require('bootstrap/dist/css/bootstrap.min.css');

	Application.set('Util',
			require(Application.get('UTIL_PATH') + '/index.js')(this),
			true);
};
/**
 * 加载Components,挂载到Application.Component下
 * @param  {[type]} path [description]
 * @return {[type]}	  [description]
 */
Application.loadComponents = function(path) {
	Application.set('Component', require(path + '/index.js')(this), true);
	Application.setUpModels();
	Application.setUpViews();
};

/**
 * 加载所有基础js类
 * @param  {[type]} path [description]
 * @return {[type]}	  [description]
 */
Application.loadScripts = function(path) {
	// require(this.get('PUBLIC_PATH') + '/js/foo.js');
};
/**
 * 加载所有view组件挂载到Application.View下
 * @param  {[type]} path [description]
 * @return {[type]}	  [description]
 */
Application.loadViews = function(path) {
	Application.set('View',
			require(path + '/index.js')(this),
			true);
};
/**
 * 加载所有view组件挂载到Application.Model下
 * @note 同级Model不要相互依赖
 * @param  {[type]} path [description]
 * @return {[type]}	  [description]
 */
Application.loadModels = function(path) {
	Application.set('Model',
			require(path + '/index.js')(this),
			true);
};
/**
 * 加载所有自定义样式css
 * @param  {[type]} path [description]
 * @return {[type]}	  [description]
 */
Application.loadStylesheets = function (path) {
	// require(this.get('PUBLIC_PATH') + '/css/foo.css');
};
//Abandoned
Application.getModel = function() {
	return this._models;
};

Application.getRoute = function() {
	return this._routes;
};

Application.getView = function() {
	return this._views;
};

Application.setUpModels = function() {

};

module.exports = Application;
