angular.module('Ketch')
.controller('gameCtrl', function(models, $scope, $state) {

// auto-init game when built up enough
	var game = this

	console.log('gameCtrl')

	$scope.player = null
	$scope.stat   = null

	$scope.field = []
	$scope.bench = []

	$scope.models = models // works, but don't necessarily want to do it this way

	$scope.fullPreloads = function() {
		models.initPreloads()
		var team = models.team(models.userTeams[0]) // loads roster
		team.roster.forEach(function(playerID) {
			$scope.bench.push(models.player(playerID))
		})
		models.initGame()
	}

	var refreshGame = function() {
		$scope.game = models.pullGame()
	}

	$scope.doneSubs = function() {
		models.line($scope.field)
		$state.go('game.play.inPlay')
	}

	$scope.recordScore = function(result) {
		models.recordScore(result)
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
			models.stat($scope.player, $scope.stat)
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
	// }

	// $scope.toScoreSummary = function() {
	// 	$state.go('scoreSummary')
	// }

	// $scope.backToGame = function() {
	// 	$state.go('game')
	// }

})