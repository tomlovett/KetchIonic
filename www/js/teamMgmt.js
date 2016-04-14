angular.module('Ketch')
.controller('teamMgmt', ['$ionicModal', 'models', function($ionicModal, models) {

	// $ionicModal.fromTemplateUrl('templates/editTeam.html', {scope: $scope})
	// 	.then(function(modal) { $scope.teamModal = modal })

	// $ionicModal.fromTemplateUrl('templates/editPlayer.html', {scope: $scope})
	// 	.then(function(modal) { $scope.playerModal = modal })

	$scope.editTeam   = null
	$scope.editPlayer = null

	var loadRoster = function(teamObj) {
		teamObj.roster.forEach(function(playerID) {
			models.player(playerID)
		})
	}

	var loadTeams = function() {
		models.userTeams.forEach(function(teamID) {
			models.team(teamID)
		})
		// doesn't make sense; if in teams will already have fully loaded object
	}

	// loadTeams()

	$scope.firePlayer = function(player) {
		if (player) { $scope.editPlayer = player }
		$scope.playerModal.show()
	}

	$scope.submitPlayer = function() {
		models.updatePlayer($scope.editPlayer)
		$scope.playerModal.hide()
		$scope.editPlayer = {}
	}

	$scope.fireTeam = function(team) {
		if (team) { $scope.editTeam = team }
		$scope.teamModal.show()
	}

	$scope.submitTeam = function() {
		models.updateTeam($scope.editTeam)
		$scope.teamModal.hide()
		$scope.editTeam = {}
	}


}])