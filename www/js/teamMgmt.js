angular.module('Ketch')
.controller('teamMgmt', function(models, $state) {

	var mgmt = this
	console.log('teamMgmt')

	mgmt.models = models

	mgmt.team   = null
	mgmt.roster = []
	mgmt.player = {}

	var initController = function() {
		models.myTeams()
	}

	initController()

	mgmt.initGame = function() {
		// models.initGame(mgmt.team)
		$state.go('game.subs')
	}

	mgmt.focusTeam = function(team) {
		models.callRoster(team._id)
		mgmt.team = team
		models.gameTeam = mgmt.team
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
		$state.go('team.yourTeams')
	}
	
	mgmt.managePlayer = function(player) {
		mgmt.player = player || {}
		$state.go('team.editPlayer')
	}

	mgmt.submitPlayer = function() {
		if (mgmt.player._id) 	models.updatePlayer(mgmt.player)
		else					models.createPlayer(mgmt.player)
		mgmt.player = {}
		$state.go('team.oneTeam')
		// make current team auto-selected
		// allow chain-building
	}

	// mgmt.emailDump
		// enter a list of emails in reply-all format
			// create multipe base-version players
			// OR load existing from the database

})