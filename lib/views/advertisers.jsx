module.exports = function(App) {
	var m = App.m;

	var createTabUl = function (vm) {
		return m("ul[role=tablist].nav nav-tabs",
		    _.keys(vm.dspList).map(function(item, index){
		    	return m(index === 0 ? "li[role=presentation].active" : "li",
	                m("a[data-toggle=tab]",
	                	{
	                		"href": "#"+item,
	                		"aria-expanded": index === 0 ? true : false
	                	}, item)
	            );
		    })
		);
	};
	var createTabDiv = function (vm) {
		return m("div.tab-content.p10",
			_.keys(vm.dspList).map(function(key, index){
				var records = vm.dspList[key];
				return m("div",
					{
						"id": key,
						"class": index === 0 ? "tab-pane active nopadding" : "tab-pane nopadding"
					},
					[
						_.map(records , function(dspName, dspKey){
							return m("label", {
								"class" : (key === "pc" && dspKey === "bd") ? "checkbox checkbox-inline checkbox-ml0 checked" : "checkbox checkbox-inline checkbox-ml0"
							},[
								m("span.icons",[
									m("span.first-icon fa fa-square-o"),
									m("span.second-icon fa fa-check-square-o")
								]),
								m("input[type=checkbox][data-toggle=data-toggle]",{"value":dspKey}),
								m("span", dspName)
							]);
						})
					]
				);
			})
		);
	};

	return function(vm) {
		//to make the drawer menu to work well,manually update it
		return m('.content', [
				m(".col-md-12", [
					m(".card", [
						m(".header.mb10", [m("h4.title", "DSP数据概况")]),
						m(".content", [
							m("form.form-horizontal[action='/'][method='get']", [
								m("fieldset", [
									m(".form-group", [
										m(".col-sm-12", [
											createTabUl(vm),
											createTabDiv(vm)
										])
									])
								])
							])
						])
					])
				]),
				m.component(App.Component.get('Panel'), {
					colClass:"col-md-6",
					headTitle:"今日实时统计",
					headDesc:"展示",
					panelContent: "content",
					datarangepicker: {
						name : 'dsprangepicker'
					}
				})

			])
	};
};
