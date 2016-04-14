angular.module('Ketch').factory('authInterceptor', function(authToken) {

	var interceptor = {}

	interceptor.request = function(config) {
		var token = authToken.get()
		if (token) 		{ config.headers['x-access-token'] = token }
		return config
	}

	return interceptor

})