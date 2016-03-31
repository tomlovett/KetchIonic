angular.module('Ketch')
.controller('teamMgmt', ['$scope', '$ionicModal', 'data', function($scope, $ionicModal, data) {

	// $ionicModal.fromTemplateUrl('templates/editTeam.html', {scope: $scope})
	// 	.then(function(modal) { $scope.teamModal = modal })

	// $ionicModal.fromTemplateUrl('templates/editPlayer.html', {scope: $scope})
	// 	.then(function(modal) { $scope.playerModal = modal })

	$scope.editTeam   = {}
	$scope.editPlayer = {}

	$scope.allPlayers = []

	var loadRosters = function(teamObj) {
		teamObj.roster.forEach(function(playerID) {
			$scope.allPlayers.push(data.player(playerID))
		})
	}

	var loadTeams = function() {
		data.teams.forEach(function(teamID) {
			data.team(teamID)
				.then(function(teamObj) { loadRosters(teamObj) })
		})
	}

	// loadTeams()

	$scope.firePlayer = function(player) {
		if (player) { $scope.editPlayer = player }
		$scope.playerModal.show()
	}

	$scope.submitPlayer = function() {
		data.updatePlayer($scope.editPlayer)
		$scope.playerModal.hide()
		$scope.editPlayer = {}
	}

	$scope.fireTeam = function(team) {
		if (team) { $scope.editTeam = team }
		$scope.teamModal.show()
	}

	$scope.submitTeam = function() {
		data.updateTeam($scope.editTeam)
		$scope.teamModal.hide()
		$scope.editTeam = {}
	}


}])