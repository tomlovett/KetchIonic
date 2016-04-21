angular.module('Ketch')
.controller('teamMgmt', function(models, $state) {

	var mgmt = this
	console.log('teamMgmt')

	mgmt.models = models

	mgmt.team   = null
	mgmt.roster = []
	mgmt.player = null


	var initController = function() {
		models.myTeams()
	}

	initController()

	mgmt.focusTeam = function(teamObj) {
		console.log('focusTeam -> teamObj: ', teamObj)
		mgmt.team   = teamObj
		mgmt.roster = []
		teamObj.roster.forEach(function(playerID) {
			console.log('focusTeam -> forEach -> playerID: ', playerID)
			mgmt.roster.push(models.player(playerID))
		})
		$state.go('team.oneTeam')
	}

	mgmt.manageTeam = function(team) {
		if (!team) 		mgmt.team = {}
		$state.go('team.editTeam')
	}

	mgmt.managePlayer = function(player) {
		mgmt.player = player || {}
		$state.go('team.editPlayer')
	}

	mgmt.submitPlayer = function(done) {
		console.log('submitPlayer fired')
		console.log('done: ', done)
		if (mgmt.player._id) { // new players will not have an _id property
			models.updatePlayer(mgmt.player)
		} else {
			models.createPlayer(mgmt.player)
		}
		mgmt.player = {}
		if (done)		$state.go('team.oneTeam')
	}

	mgmt.submitTeam = function() {
		if (mgmt.team._id) { // new teams will not have an _id property
			models.updateTeam(mgmt.team)
		} else {
			models.createTeam(mgmt.team)
		}
		$state.go('team.yourTeams')
	}

})