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
		$state.go('game.subs') // change to ui-sref
	}

	mgmt.focusTeam = function(team) {
		models.loadRoster(team)
		models.gameTeam = team
		mgmt.team       = team
		$state.go('team.oneTeam') // can re-work to paramaterized route
	}

	mgmt.manageTeam = function(team) {
		if (!team) 		mgmt.team = {}
		$state.go('team.editTeam') // parameterize
	}

	mgmt.submitTeam = function() {
		if (!mgmt.team._id) models.createTeam(mgmt.team)
		else				models.updateTeam(mgmt.team)
		$state.go('team.yourTeams') // parameterize
	}
	
	mgmt.managePlayer = function(player) {
		mgmt.player = player || {}
		loadRosterStatus(player)
		$state.go('team.editPlayer') // parameterize
	}

	mgmt.submitPlayer = function() {
		if (!mgmt.player.handle)	mgmt.player.handle = mgmt.player.first
		if (mgmt.player._id) 	models.updatePlayer(mgmt.player, mgmt.status)
		else					models.createPlayer(mgmt.player, mgmt.status)
		// create/updatePlayer -> rosterMove -> updateTeam -> loadRoster
		mgmt.player = {}
		$state.go('team.oneTeam')
		// allow chain-building
	}

	var loadRosterStatus = function(player) {
		mgmt.status = {}
		for (var teamID in models.teams) {
			if (!player._id) {
				mgmt.status[teamID] = false
			} else {
				var roster = models.teams[teamID].roster
				var index  = roster.indexOf(player._id)
				mgmt.status[teamID] = (index !== 1)
			}
		}
		if (!player._id && $state.current.url == '/oneTeam' )
			mgmt.status[mgmt.team._id] = true // do not fire from allPlayers
	}


	// mgmt.emailDump
		// enter a list of emails in reply-all format
			// create multipe base-version players {last: email}
			// OR load existing from the database

})