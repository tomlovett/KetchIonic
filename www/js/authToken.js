angular.module('Ketch').factory('authToken', function($window) {

	var tokenFactory = {}

	tokenFactory.get = function() {
		return $window.localStorage.getItem('token')
	}

	tokenFactory.set = function(token) {
		if (token)		$window.localStorage.setItem('token', token)
		else			$window.localStorage.removeItem('token')
	}

	return tokenFactory

})