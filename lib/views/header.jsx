module.exports = function(App) {
	var m = App.m;
	var updateDom = App.Util.get('mdlUpdate');
	return function(ctl) {
        
        var users = App.Model.get('session').users();
        var currentUser = App.Model.get('session').currentUser();
        
		return m("nav.navbar.navbar-default", [
				m(".container-fluid", [
					m(".navbar-header", [
						m("button.navbar-toggle[data-toggle='collapse'][type='button']", [
							m("span.sr-only", "Toggle navigation"),
							m("span.icon-bar"),
							m("span.icon-bar"),
							m("span.icon-bar")
						]),
						m("a.navbar-brand[href='#']", ctl.getRoute())
					]),
					m(".collapse.navbar-collapse", [
						m("form.navbar-form.navbar-left.navbar-search-form[role='search']", [
							m(".input-group", [
								m("span.input-group-addon", [m("i.fa.fa-search")]),
								m("input.form-control[placeholder='搜索媒体...'][type='text'][value='']")
							])
						]),
						m("ul.nav.navbar-nav.navbar-right", [
							m("li.dropdown", [
								m("a.dropdown-toggle[data-toggle='dropdown'][href='#']", [
									m("i.fa.fa-download"),
									m("p.hidden-md.hidden-lg", "Actions")
								]),
								m("ul.dropdown-menu", [
									m("li", [m("a[href='#']", "下载今日报表")]),
									m("li", [m("a[href='#']", "下载本周报表")]),
									m("li", [m("a[href='#']", "下载本月报表")]),
									m("li.divider"),
									m("li", [m("a[href='#']", "自定义下载")])
								])
							]),
							m("li.dropdown", [
								m("a.dropdown-toggle[data-toggle='dropdown'][href='#']", [
									m("i.fa.fa-users"),
									m("p.hidden-md.hidden-lg", "Notifications")
								]),
								m("ul.dropdown-menu", [
				                                    _.map(users, function (user, id) {
				                                        return m('li', [
				                                            m('a[href="#"]', { onclick: ctl.switch.bind(ctl, id) }, m.trust(user.name + ' (' + user.email + ')'))
				                                        ]);
				                                    })
								])
							]),
							m("li.dropdown.dropdown-with-icons", [
								m("a.dropdown-toggle[data-toggle='dropdown'][href='#']", [
									m("i.fa.fa-user"),
									m("p.hidden-md.hidden-lg", "More")
								]),
								m("ul.dropdown-menu.dropdown-with-icons", [
									m("li", [
										m("a[href='#']", [
											m("i.pe-7s-help1"),
											" Help Center"
										])
									]),
									m("li", [
										m("a[href='#']", { onclick: ctl.setting }, [
											m("i.pe-7s-tools"),
											" Settings"
										])
									]),
									m("li.divider"),
									m("li", { onclick: ctl.logout }, [
										m("a.text-danger[href='#']", [
											m("i.pe-7s-close-circle"),
											"Log out"
										])
									])
								])
							])
						])
					])
				])
		])
	}
	
}