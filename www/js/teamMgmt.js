angular.module('Ketch')
.controller('teamMgmt', function(models, $state) {

	var mgmt = this
	console.log('teamMgmt')

	mgmt.models = models

	mgmt.team   = null
	mgmt.roster = []
	mgmt.player = {}

	mgmt.status = {} // short for "rosterStatus"

	var initController = function() {
		models.myTeams()
	}

	initController()

	mgmt.initGame = function() {
		$state.go('game.subs')
	}

	mgmt.focusTeam = function(team) {
		models.loadRoster(team)
		models.gameTeam = team
		mgmt.team       = team
		$state.go('team.oneTeam')
	}

	mgmt.manageTeam = function(team) {
		if (!team) 		mgmt.team = {}
		$state.go('team.editTeam')
	}

	mgmt.submitTeam = function() {
		if (!mgmt.team._id) models.createTeam(mgmt.team)
		else				models.updateTeam(mgmt.team)
			// checking for changes before submitting
			// eh, computationally heavy; just do it anyway
		$state.go('team.yourTeams')
	}
	
	mgmt.managePlayer = function(player) {
		mgmt.player = player || {}
		loadRosterStatus(player)
		$state.go('team.editPlayer')
	}

	mgmt.submitPlayer = function() {
		if (mgmt.player._id) 	models.updatePlayer(mgmt.player, mgmt.status)
		else					models.createPlayer(mgmt.player, mgmt.status)
		// check for roster add/drops
		mgmt.player = {}
		$state.go('team.oneTeam')
		// make current team auto-selected
		// allow chain-building
	}

	var loadRosterStatus = function(player) {
		mgmt.status = {}
		for (var teamID in models.teams) {
			if (!player) {
				mgmt.status[teamID] = false
			} else {
				var roster = models.teams[teamID].roster
				var index  = roster.indexOf(player._id)
				mgmt.status[teamID] = (index !== 1)
			}
		}
		// mgmt.status[mgmt.team._id] = true // for new players
		console.log('mgmt.status: ', mgmt.status)
	}

	// mgmt.verifyRosterStatus = function(playerID) {
	// 	for (var teamID in models.teams) {
	// 		var team = models.teams[teamID]
	// 		var index = team.roster.indexOf(playerID)
	// 		var actual = (index !== -1)
	// 		if (mgmt.status.teamID !== actual) {
	// 			models.rosterMove(playerID, team)
	// 		}
	// 	}
	// }

	var verifyStatus = function() {
		console.log('verifyRosterStatus -> this: ', this)
		for (var teamID in models.teams) {
			var team = models.teams[teamID]
			if (mgmt.status.teamID !== (this._id in team.roster)) {
				models.rosterMove(this._id, team)
			}
		}
	}

	// mgmt.emailDump
		// enter a list of emails in reply-all format
			// create multipe base-version players {last: email}
			// OR load existing from the database

})