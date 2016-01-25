module.exports = function(App) {
	//a application level api for update dom modal
	/**
	 * Bootstrap会话框对象，view写在main.js下
	 * App.Util.get('modal')
	 *
	 * 初始化：初始化时传入配置对象，具体配置参数参考 defaultOpt
	 * 事件：在组件中可以通过 modal.on 绑定事件监听器，事件触发（modal.trigger）调用监听器时第一个参数为 callback，监听器执行完毕后调用该 callback，传入两个参数，第一个为 err，第二个为 results
	 * 点击确定：触发 confirm 事件，并将结果传给初始化时配置的 confirm 回调，该回调约定第一个参数为 err，第二个参数为 results
	 * 多步modal：当传入的 components 为数组时，modal包含多个步骤，每步使用其中一个 component。最后一步显示“确定”，其它步骤显示“下一步”。点击下一步时会触发 next 事件，事件执行成功则执行下一步，并将执行结果作为 cArgs 传给下一个组件。
	 *
	 * @type {[type]}
	 */
	var m = App.m;

	var defaultOpt = {
		// Mithril的组件
		component: {
			controller: function() {},
			view: function() {
				return m('', 'modal')
			}
		},
		// 传给controller的参数
		cArgs: null,
		// 会话框标题
		title: 'SSP',
		// 取消按钮的Callback
		cancle: function() {},
		// confirm callback
		confirm: function() {},

		onshow: function() {},

		onhide: function() {}
	};

	var modal = {
		// Mithril的组件
		component: m.prop(),
		// 传给controller的参数
		cArgs: m.prop(),
		// 会话框标题
		title: m.prop(),
		// 取消按钮的Callback
		cancle: m.prop(),
		// confirm callback
		confirm: m.prop(),
		onshow: m.prop(),
		onhide: m.prop(),
		showConfirm: m.prop(true),
		sizeStyle: m.prop(),
		// 内部属性，用来模拟 EventEmitter
		_events: {}
	};

	/**
	 * register a listener on modal event
	 */
	modal.on = function(event, listener) {
		if (this._events[event]) this._events[event].push(listener);
		else this._events[event] = [listener];

		return modal;
	};

	/**
	 * trigger an event
	 */
	modal.trigger = function(event, callback) {
		if (!this._events[event] || !this._events[event].length) return callback.call(null, null, []);

		var results = [];
		var cnt = this._events[event].length;
		var end = false;
		this._events[event].forEach(function(listener, index) {
			listener.call(null, function(err, result) {
				if (end) return;

				if (err) {
					end = true;
					return callback.call(err);
				}

				cnt--;
				results[index] = result;
				if (!cnt) {
					end = true;
					return callback.call(null, null, results);
				}
			});
		});

	};

	modal.confirmed = function() {
		this.trigger('confirm', function(err, results) {
			if (modal.confirm()) return modal.confirm().call(null, err, results);
		});
	};

	modal.next = function() {
		this.trigger('next', function(err, results) {
			delete modal._events['next'];
			modal.cArgs(results);
			modal.component().splice(0, 1);
		});
	};

	modal.isMultiStep = function() {
		return _.isArray(this.component()) && this.component().length > 1;
	};

	modal.currentComponent = function() {
		return _.isArray(this.component()) ? this.component()[0] : this.component();
	};

	/**
	 * 初始化 会话对象
	 * @param {[type]} options [description]
	 */
	modal.set = function(options) {
		this._events = {};
		if (!options) return this;
		this.component(_.clone(options.component || defaultOpt.component));
		this.cArgs(options.cArgs || defaultOpt.cArgs);
		this.title(options.title || defaultOpt.title);
		this.cancle(options.cancle || defaultOpt.cancle);
		this.confirm(options.confirm || defaultOpt.confirm);
		this.onshow(options.onshow || defaultOpt.onshow);
		this.onhide(options.onhide || defaultOpt.onhide);
		this.sizeStyle(options.sizeStyle);

		if (!(options.showConfirm === undefined)) {
			this.showConfirm(options.showConfim);
		}
		return this;
	};
	/**
	 * 暴漏接口 清除modal状态
	 * @return {[type]} [description]
	 */
	modal.clear = function() {
		modal.set(defaultOpt);
	};
	/**
	 * 初始化 modal
	 */
	modal.set(defaultOpt);
	/**
	 * 打开会话框 接口
	 * @return {[type]} [description]
	 */
	modal.open = function() {
		var self = this;

		$('#myModal').modal('show');

		$('#myModal').on('hidden.bs.modal', function() {
			//fixed for click on overlay
			m.startComputation();
			self.onhide()();
			modal.set(defaultOpt);
			m.endComputation();
		});

		$('#myModal').on('show.bs.modal', self.onshow());
	};

	modal.close = function() {
		$('#myModal').modal('hide');
	};

	return modal;
};