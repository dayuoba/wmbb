module.exports = function (App) {

	var m = App.m;
	
	return function (vm) {
		
		return m('.row.agent-container', [
				m('.col-md-12', [
					m('.card', [
						m('.header', [
							m('.pull-left', [
								m('input.form-control[type="text"][placeholder="Search"]')
							]),
							m('.pull-right', [
								m('button.btn.btn-default', {onclick: vm.newUserHandler}, [
									m('i.fa.fa-plus.glyphicon')
								])
							]),
							m('.clearfix')
						]), //header
						m('.content.table-responsive.table-full-width', [
							m('table.table.table-hover.table-striped', [
								m('thead', [
									m('tr', [
										m('th', 'Email'),
										m('th', 'Name'),
										m('th', 'Remark'),
										m('th.text-right', 'Action')
									])
								]), //thead
								m('tbody', [
									vm.list.map(function (agent) {
										return m('tr', { key: agent.accountID }, [
											m('td', agent.email),
											m('td', agent.name),
											m('td', agent.remark),
											m('td.td-actions.text-right', [
												m('a.btn.btn-info.btn-simple.btn-icon.table-action', [
													m('i.fa.fa-user')
												]),
												m('a.btn.btn-success.btn-simple.btn-icon.table-action', [
													m('i.fa.fa-edit')
												]),
												m('a.btn.btn-danger.btn-simple.btn-icon.table-action', [
													m('i.fa.fa-remove')
												])
											])
										]);
									})
								]) //tobody
							]) //table
						]), //content
						m('.pagination-footer', [
							App.Component.get('pagination').view(vm.pagination),
							m('.clearfix')
						])
					]) //card
				]) //col-md-12
			]); //.row.agent-container
	};	
};
