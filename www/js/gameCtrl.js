angular.module('Ketch')
.controller('gameCtrl', ['$scope', '$state', 'data', function($scope, $state, data) {

// auto-init game

	$scope.player = null
	$scope.stat   = null

	$scope.field = []
	$scope.bench = []

	data.teams[0].roster.forEach(function(playerID) {
		$scope.bench.push(data.player(playerID))
	})

	$scope.doneSubs = function() {
		$state.go('inPlay')
		$scope.point = { line: $scope.field }
	}

	$scope.recordScore = function(result) {
		$scope.point.result = result
		data.passPoint($scope.point)
		$scope.point = {}
		$state.go('subs')
	}

	var recordStat = function() {
		$scope.point.stats[$scope.stat] = $scope.player._id
	}

	$scope.move = function(player, from, to) {
		var index = from.indexOf(player)
		to.push(from.splice(index, 1)[0])
		to.sort()
	}

	$scope.clearLine = function() {
		while ($scope.field.length > 0) {
			$scope.move($scope.field[0], $scope.field, $scope.bench)
		}
	}

	$scope.closeGame = function() {
		data.closeGame()
		'go somewhere? do something?'
	}

	$scope.toScoreSummary = function() {
		$state.go('scoreSummary')
	}

	$scope.backToGame = function() {
		$state.go('game')
	}

	$scope.oneGender = function(player, gender) {
		return player.gender == gender
	}

}])