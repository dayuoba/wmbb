module.exports = function(App) {
	var m = App.m;
	var routers = App.Util.get('router');
	
	var filterMenu = function (menu) {
		if (_.isArray(menu.submenu)) return filterExpandableMenu(menu);
		
		var router = routers[menu.route];
		if (!router || !router.allow()) return false;
		
		return true;
	};
	
	var filterExpandableMenu = function (menu) {
		return _.some(menu.submenu, filterMenu);
	};
	
	var normalMenu = function (menu) {
		return m('li', [
			m('a', { config: m.route, href: menu.href }, [
				m('i', { className: menu.icon }),
				m('p', menu.label)
			])
		]);
	};
	
	var expandableMenu = function (menu) {
		return m("li", [
			m("a.collapsed[data-toggle='collapse']", { href: '#' + menu.id }, [
				m("i", { className: menu.icon }),
				m("p", [menu.label, m("b.caret")])
			]),
			m(".collapse", { style: { "height": "0" }, id: menu.id }, [
				m("ul.nav", [
					_.map(
						_.filter(menu.submenu, filterMenu),
						function (item) {
							return m('li', [
								m('a', { href: item.href, config: m.route }, item.label)
							]);
						}
					)
				])
			])
		]);
	};

	//TODO 保留用户访问状态
	return function(vm) {

		var currentUser = App.Model.get('session').currentUser();

		//to make the drawer menu to work well,manually update it
		return m(".sidebar[data-color='orange'][data-image='lib/assets/img/sidebar-4.jpg']", [
				m(".logo", [
					m("a.logo-text[href='http://pro.cn']", [
						"无场景 不广告",
						m('br'),
						"       --广告家"
					])
				]),
				m(".sidebar-wrapper", [
					m(".user", [
						m(".photo", [
							m("img[src='lib/assets/img/adlogo.png']")
						]),
						m(".info", [
							m("a.collapsed[data-toggle='collapse'][href='#collapseExample']", [
                				currentUser ? currentUser.name : 'No Login',
								m("b.caret")
							]),
							m(".collapse[id='collapseExample']", [
								m("ul.nav", [
									m("li", [m("a[href='#']", "账户设置")]),
								])
							])
						])
					]),
					m('ul.nav', [
						_.map(
							_.filter(vm.menus, filterMenu),
							function (menu) {
								return _.isArray(menu.submenu)
										? expandableMenu(menu)
										: normalMenu(menu);
							}
						)
					]),
				]),
				m(".sidebar-background", {style: {"background-image": " url(lib/assets/img/sidebar-4.jpg) "}})
		])

	}

};
