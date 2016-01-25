module.exports = function(App) {
	/**
	 * 日期操作的基本工具
	 * @type {Object}
	 */
	var DateUtil = {};

	DateUtil.recentWeek = function() {
		var range = {};
		range.end = moment().format('YYYY-MM-DD');
		range.start = moment(range.end).subtract(6, 'days').format('YYYY-MM-DD');
		return range;
	};

	DateUtil.recentMonth = function() {
		var range = {};
		range.end = moment().format('YYYY-MM-DD');
		range.start = moment(range.end).subtract(29, 'days').format('YYYY-MM-DD');
		return range;
	};

	return DateUtil;
};