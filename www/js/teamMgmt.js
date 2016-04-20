angular.module('Ketch')
.controller('teamMgmt', function(models) {

	var mgmt = this
	console.log('teamMgmt')

	mgmt.team   = null
	mgmt.roster = []
	mgmt.player = null

	var initController = function() {
		// console.log('Loading you...')
		if (!models.user)			models.me()
		// console.log('Loading your teams...')
		if (!models.teams.length)	models.myTeams()
	}

	initController()

	mgmt.focusTeam = function(team) {
		mgmt.team   = team
		mgmt.roster = []
		team.roster.forEach(function(playerID) {
			mgmt.roster.push(models.player(playerID))
		})
		// go to oneTeam
	}

	mgmt.manageTeam = function(team) {
		if (!team) 		mgmt.team = {}
		// go to editTeam
	}

	mgmt.managePlayer = function(player) {
		mgmt.player = player || {}
		// go to editPlayer
	}

	mgmt.submitPlayer = function() {
		console.log('submitPlayer fired')
		if (mgmt.player._id) { // new players will not have an _id property
			models.updatePlayer(mgmt.player)
		} else {
			models.createPlayer(mgmt.player)
		}
		mgmt.player = {}
		// go back
	}

	mgmt.submitTeam = function() {
		if (mgmt.team._id) { // new teams will not have an _id property
			models.updateTeam(mgmt.team)
		} else {
			models.createTeam(mgmt.team)
		}
		// go to team
	}

})