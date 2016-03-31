angular.module('Ketch')
.controller('entry', ['$scope', '$state', 'data', function($scope, $state, data) {

	$scope.signingUp = false
	$scope.loginData = {}

	var verifyInput = function() {
		$scope.errMsg = null
		if (!($scope.loginData.username) || !$scope.loginData.password) {
			$scope.errMsg = 'Data not filled out, retry please.'
			// [verify email input]
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

	var handleError = function(err) {
		'route error -> bad login, email taken, etc.'
	}

	var loadUser = function(player, teams) {
		data.user = player
		data.teams = teams
		$state.go('team')
	}

	$scope.login = function() {
		if (verifyInput())  { return }
		if ($scope.loginData.username == 'tom') {
			data.initPreloads()
		} else {
			'post to server'
			data.loadUser('res.player')
		}
		$state.go('team')
	}

	$scope.beginTutorial = function() {}

}])
