/**
 * A util to wrap any object into a thennable object
 */
module.exports = function (App) {
	var m = App.m;
	
	var wrap = function (obj) {
		var deferred = m.deferred();
		
		if (obj.then) {
			obj.then(function (result) {
				deferred.resolve(result);
			}, function (error) {
				deferred.reject(error);
			});
		} else {
			deferred.resolve(obj);
		}
		
		return deferred.promise;
	};
	
	return {
		wrap: wrap
	};
};