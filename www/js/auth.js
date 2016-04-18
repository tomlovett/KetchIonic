angular.module('Ketch').factory('auth', function(authToken, $http) {

var addr = 'http://localhost:3000'

var auth = {}

// catchToken() ? -> returns false or token

var catchToken = function(res) {
	if (res.token) {
		authToken.set(res.token)
		return res.token
	} else {
		return res.data.message // syntax
	}
}

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

// auth.isLoggedIn = function() {
// 	if (authToken.get()) 	return true
// 	else					return false
// 	// simplify to return auth.getToken()?
// }

// auth.getUser = function() {
// 	var token = authToken.get()
// 	if (token) 			return token.user
// 	else				return false
// } // insecure? passing user this way?
// // don't need to; back-end will handle

return auth

})