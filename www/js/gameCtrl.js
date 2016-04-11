angular.module('Ketch')
.controller('gameCtrl', ['$scope', '$state', 'data', function($scope, $state, data) {

// auto-init game when built up enough
	console.log('gameCtrl')

	$scope.player = null
	$scope.stat   = null

	$scope.field = []
	$scope.bench = []

	$scope.data = data // works, but don't necessarily want to do it this way

	$scope.fullPreloads = function() {
		data.initPreloads()
		var team = data.team(data.userTeams[0]) // loads roster
		team.roster.forEach(function(playerID) {
			$scope.bench.push(data.player(playerID))
		})
		data.initGame()
	}

	var refreshGame = function() {
		$scope.game = data.pullGame()
	}

	$scope.doneSubs = function() {
		data.line($scope.field)
		$state.go('game.play.inPlay')
	}

	$scope.recordScore = function(result) {
		data.recordScore(result)
		$state.go('game.play.subs')
	}

	$scope.recordStat = function(clicked) {
		if (typeof clicked === 'string') { // stats pass string values
			if ($scope.stat)   { $scope.stat = null    }
			else               { $scope.stat = clicked }
		} else {						   // players pass player objects
			if ($scope.player) { $scope.player = null }
			else 			   { $scope.player = clicked }
		}
		if ($scope.player && $scope.stat) {
			data.stat($scope.player, $scope.stat)
			$scope.player = null
			$scope.stat   = null			
		}
	}

	$scope.move = function(player, from, to) {
		var index = from.indexOf(player)
		to.push(from.splice(index, 1)[0])
	}

	$scope.clearLine = function() {
		while ($scope.field.length > 0) {
			$scope.move($scope.field[0], $scope.field, $scope.bench)
		}
	}

	// $scope.closeGame = function() {
	// 	data.closeGame()
	// 	'go somewhere? do something?'
	// }

	// $scope.toScoreSummary = function() {
	// 	$state.go('scoreSummary')
	// }

	// $scope.backToGame = function() {
	// 	$state.go('game')
	// }

}])