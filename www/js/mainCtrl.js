angular.module('Ketch')
.controller('mainCtrl', function(models, auth, authToken, $state) {

	console.log('mainCtrl')

	var main = this

	main.signingUp = false
	main.loginData = {}
	main.loginData.gender = 'm'

	var verifyInput = function() {
		main.errMsg = null
		if (!(main.loginData.email) || !main.loginData.password) {
			main.errMsg = 'Login not filled out, retry please.'
		}
		if (main.signingUp) {
			if (main.loginData.password !== main.loginData.password2) {
				main.errMsg = 'Sign-in failed. Passwords do not match.'
			} else if (!main.loginData.password2) {
				main.errMsg = 'No confirmation password.'
			} else if (!main.loginData.first || !main.loginData.last || !main.loginData.gender) {
				main.errMsg = 'Please fill out player data.'
			}
		}
		return main.errMsg
	}

	main.submitLogin = function() {
		if (verifyInput())  return
		if (main.signingUp) {
			console.log('Signing you up...')
			auth.signup(main.loginData)
				.success(setUser)
		} else {
			console.log('Logging you in...')
			auth.login(main.loginData)
				.success(setUser)
		}
	}

	var setUser = function(res) {
		if (!res.success) { 
			console.log('Error: ', res.message)
			return
		}
		authToken.set(res.token)
		console.log('Login success')
		$state.go('team.yourTeams')
	}

	main.tutorial = function() {
		auth.tutorial()
			.success(setUser)
	}

})
