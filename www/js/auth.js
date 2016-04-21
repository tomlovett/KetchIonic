angular.module('Ketch').factory('auth', function(authToken, $http) {

var addr = 'http://localhost:3000'

var auth = {}

auth.login = function(user) {
	return $http.post(addr + '/auth/login', user)
}

auth.signup = function(user) {
	return $http.post(addr + '/auth/signup', user)
}

auth.logout = function() {
	authToken.set()
}

auth.tutorial = function() {
	return $http.get(addr + '/auth/tutorial')
}

return auth

})