module.exports = function (App) {

	var m = App.m;

	var NOT_FOUND = { controller: function() {}, view: function() { return m('', 'NOT FOUND'); } };

	var main = {
		_selfView: true
	};

	main.controller = function (args) {

		// if (m.route() !== '/login' && !App.Model.get('session').signed()) {
		// 	return App.m.route('/login');
		// }

		var vm = {};
		
		/**
		 * 根据路由处理内容，默认加载layout布局
		 * @return {[type]} [description]
		 */
		vm.component = function () {
			var path = m.route.param('path') || 'home';
			/**
			 * Comment below is for auth use
			 */
			// var router = App.Util.get('router')[path];
			// var component = (router && router.allow()) ? router.getComponent() : NOT_FOUND;
			return App.Component.get(path);
		};

		vm.modal = App.Util.get('modal');

		return vm;
	};

	main.view = function (vm, args) {
		return [
			m("#container .wrapper", [
				m(".content", [
					m(".container-fluid", [
						m.component(vm.component())
					])
				])
			]),
			/**
			 * Bootstrap会话框对象
			 * 接口在App.Util.get('modal')下，用来修改当前会话对象
			 * @type {String}
			 */
			m(".modal.fade[aria-labelledby='myModalLabel'][id='myModal'][role='dialog'][tabindex='-1']",  [
				m(".modal-dialog[role='document']", {class: vm.modal.sizeStyle()}, [
					m(".modal-content", [
						m(".modal-header", [
							m("button.close[aria-label='Close'][data-dismiss='modal'][type='button']", [m("span[aria-hidden='true']", {onclick: vm.modal.cancle()}, "×")]),
							m("h4.modal-title[id='myModalLabel']", vm.modal.title())
						]),
						m(".modal-body", m.component(vm.modal.currentComponent(), vm.modal.cArgs())),
						m(".modal-footer", [
							vm.modal.isMultiStep() ? null : m("button.btn.btn-default[data-dismiss='modal'][type='button']",{onclick: vm.modal.cancle()}, "cancle"),
							!vm.modal.isMultiStep() && vm.modal.showConfirm() ? m("button.btn.btn-primary[type='button']", {onclick: vm.modal.confirmed.bind(vm.modal)}, "sure") : null,
							!vm.modal.isMultiStep() ? null : m("button.btn.btn-primary[type='button']", {onclick: vm.modal.next.bind(vm.modal) }, "next")
						])
					])
				]),
			])
		];
	};

	return main;
};
