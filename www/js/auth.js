angular.module('Ketch').factory('auth', function(authToken, $http) {

var server = 'http://localhost:3000'

var auth = {}

auth.login = function(username, password) {
	return $http.post(server + '/auth/login', {
		username: username,
		password: password
	})
		.success(function(res) {
			authToken.set(res.token)
			return res
		})
}

auth.logout = function() {
	authToken.set()
}

auth.tutorial = function() {
	$http.get('/tutorial')
		.success(function(res) {
			authToken.set(res.token)
			return res
		})
}

auth.isLoggedIn = function() {
	if (authToken.get()) 	return true
	else					return false
	// simplify to return auth.getToken()?
}

auth.getUser = function() {
	var token = authToken.get()
	if (token) 			return token.user
	else				return false
} // insecure? passing user this way?

return auth

})