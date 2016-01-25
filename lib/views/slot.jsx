module.exports = function(App) {
	var m = App.m;
	//
	var retainFalse = function (dom, init, ctx) {
		ctx.retain = false;
	};
	//初始化tooltip组件
	function tooltip(el) {
		$('[rel="tooltip"]').tooltip();
	};

	return function(ctl) {
		return m('.content.slot', [
			
			m(".row", [
				m('.col-md-12', [
					m(".card", [
						m('.header', [
							m('h4.title', '广告位管理'),
							m('p.category', [
								m('a[href="http://dev.pro.cn/doc/flowback"][target="_blank"]', '广告位使用说明')
							])
						]),
						m('.col-md-12.tool-btn', [
								m("button.btn.btn-info[type='button'][data-original-title='添加'][rel='tooltip']", {onclick: ctl.addSlot}, [
									m("i.glyphicon.fa.fa-plus")
								]),
								m("button.btn.btn-success[type='button'][data-original-title='批量备注'][rel='tooltip']", {onclick: ctl.multiplyRemark}, [
									m("i.glyphicon.fa.fa-edit")
								]),
								
								m("button.btn.btn-danger[type='button'][data-original-title='批量禁用'][rel='tooltip']", {onclick: function() {/*TODO add slot*/ ctl.addSlot();}}, [
									m("i.glyphicon.fa.fa-remove")
								]),
								m("button.btn.btn-danger[type='button'][data-original-title='批量删除'][rel='tooltip']", {onclick: function() {/*TODO add slot*/ ctl.addSlot();}}, [
									m("i.glyphicon.fa.fa-minus")
								])
						]),
						m('.col-md-4.datepicker', [
							m('legent', '开始日期'),
							m("input.form-control#pickerStart[placeholder='" + ctl.pickerStart() + "'][type='text']", {config: ctl.datepicker})
						]),
						m('.col-md-4.datepicker', [
							m('legent', '结束日期'),
							m("input.form-control#pickerEnd[placeholder='" + ctl.pickerEnd() + "'][type='text']", {config: ctl.datepicker})
						]),
						m('.ssp-slot-table', [
							m("table.table.table-hover[id='bootstrap-table']", {config: tooltip}, [
								m("thead", [
									m("tr", [
										m('th.bs-checkbox',[
											m(".th-inner", [
												m("input[name='btSelectAll'][type='checkbox']", {onchange: ctl.selectAll})
											]),
											m(".fht-cell")
										]),
										m("th[data-field='name'][data-sortable='true']", "名称"),
										m("th[data-field='remark'][data-sortable='true']", "备注"),
										m("th[data-field='view'][data-sortable='true']", "展示"),
										m("th[data-field='click'][data-sortable='true']", "点击"),
										m("th[data-field='rate'][data-sortable='true']", "收益"),
										m("th[data-field='revenue']", "单价"),
										m("th.td-actions.text-right[data-events='operateEvents'][data-field='actions'][data-formatter='operateFormatter']", "Actions")
									])
								]),
								m('tbody', {config: retainFalse}, ctl
									.table().map(function(slot, index) {
										return m("tr#" + slot.slotID, [
												m('td.bs-checkbox',[m('input[type=checkbox]')]),
												m("td", slot.name),
												m("td", slot.remark || ''),
												m("td", slot.verify || 0),
												m("td", slot.click || 0),
												m("td", slot.money || 0),
												m("td", parseFloat(slot.money && slot.click ? slot.money/slot.click : 0).toFixed(3)),
												m('td.td-actions.text-right', [
													m("a.btn.btn-simple.btn-info.btn-icon.table-action.view[data-original-title='详细'][href='javascript:void(0)'][rel='tooltip']", {onclick: ctl.slotDetail}, [
														m("i.fa.fa-bar-chart")
													]),
													m("a.btn.btn-simple.btn-success.btn-icon.table-action.edit[data-original-title='编辑'][href='javascript:void(0)'][rel='tooltip']", {onclick: ctl.modifySlot}, [
														m("i.fa.fa-edit")
													]),
													m("a.btn.btn-simple.btn-success.btn-icon.table-action.edit[data-original-title='复制'][href='javascript:void(0)'][rel='tooltip']", {onclick: function todo() {}}, [
														m("i.fa.fa-copy")
													]),
													m("a.btn.btn-simple.btn-info.btn-icon.table-action.remove[data-original-title='代码'][href='javascript:void(0)'][rel='tooltip']", {onclick: ctl.showSlotCode}, [
														m("i.fa.fa-file-word-o")
													]),
													m("a.btn.btn-simple.btn-danger.btn-icon.table-action.remove[data-original-title='禁用'][href='javascript:void(0)'][rel='tooltip']", [
														m("i.fa.fa-remove")
													]),
													m("a.btn.btn-simple.btn-danger.btn-icon.table-action.remove[data-original-title='删除'][href='javascript:void(0)'][rel='tooltip']", [
														m("i.fa.fa-minus")
													])

												])
											])
									})
								)
								
							])
							
						]),

					])
				])
			]),
		])
	};
};