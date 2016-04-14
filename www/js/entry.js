angular.module('Ketch')
.controller('entry', function(models, server, auth, $scope, $state, $http) {

	$scope.signingUp = false
	$scope.loginData = {}

	var verifyInput = function() {
		$scope.errMsg = null
		if (!($scope.loginData.username) || !$scope.loginData.password) {
			$scope.errMsg = 'Login not filled out, retry please.'
			// [verify email input] back-end?
		}
		if ($scope.signingUp) {
			if ($scope.loginData.password !== $scope.loginData.password2) {
				$scope.errMsg = 'Sign-up failed. Passwords do not match.'
			} else if (!$scope.loginData.password2) {
				$scope.errMsg = 'No confirmation password.'
			}
		}
		return $scope.errMsg
	}

	var serverError = function(err) {
		'route error -> bad login, email taken, etc.'
	}

	$scope.login = function() {
		if (verifyInput())  { return }
		if ($scope.loginData.username == 'tom') {
			models.initPreloads()
			// then go to game
		} else {
			var res = auth.login($scope.loginData.username, $scope.loginData.password)
			// asychronous
				.success(function(res) {
					$http.get('http://localhost:3000/api/player/56f174fc4a4efba0011d91ef')
						.success(function(response) {
							console.log('get -> response: ', response)
						})

				})
				.error(function(err) {

				})
			'handle errors or ->'
			// models.loadUser('res.player')
			// then state.go()
		}
		// $state.go('game.play.subs')
	}

	$scope.beginTutorial = function() {}

})
