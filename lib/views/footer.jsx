module.exports = function(App) {
	var m = App.m;
	return function(ctl) {
		return m("footer.footer", [
				m(".container-fluid", [
					m("nav.pull-left", [
						m("ul", [
							m("li", [
								m("a[href='#']", "Home")
							]),
							m("li", [
								m("a[href='#']", "Company")
							]),
							m("li", [
								m("a[href='#']", "Portfolio")
							]),
							m("li", [
								m("a[href='#']", "Blog")
							])
						])
					]),
					m("p.copyright.pull-right", ["© 2015 ",m("a[href='http://pro.cn']", "Adpro"),", No Scene No AD"])
				])
			])
	}
	
}