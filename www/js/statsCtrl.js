angular.module('Ketch')
.controller('statsCtrl', function($state, statServ, models, server) {

	var stats = this
	console.log('statsCtrl')

	stats.header = null  // text, bg-color
	stats.card   = null
	stats.detail = null

	stats.params = $state.params
	stats.serv   = statServ
	stats.models = models

	// stats.history = []

	var setHeader = function() {
		stats.header = stats.card || null
		stats.card   = {}
		// stats.header.text
		// stats.header.bgColor
	}

	stats.gameCard = function(id) {
		$state.go('stats.game', {gameID: id})
		setHeader()
		server.game(id)
			.success(function(res) {
				stats.card = res.game
				stats.card.teams[0] = models.team(res.teams[0])
				if (res.teams[1]) 
					stats.card.teams[1] = models.team(res.teams[1])
			})
		// views: scoreSummary, playerPerformance
	}

	stats.playerCard = function(id) {
		$state.go('stats.player', {playerID: id})
		setHeader()
		server.player(id)
			.success(function(res) {
				stats.card = res.player
				server.playerTeams(playerID)
					.success(function(res) {
						stats.card.teams = res
					})
				server.playerPerf(playerID)
					.success(function(res) {
						stats.card.games  = res.games
						// load all teams for games
						stats.card.points = res.points
						stats.card['+/-'] = res['+/-']
					})
			})
		// [name] teams, career stats
		// views: gameHistory, playerPerformance by gameHistory, pointHistory?
	}

	stats.teamCard = function(id) {
		$state.go('stats.team', {teamID: id})
		setHeader()
		models.team(id)
		server.team(id)
			.success(function(res) {
				stats.card = res.team
				server.teamGames(id)
					.success(function(res) {
						stats.card.games  = res.games
						stats.card.record = res.record
					})
				server.teamPerf(res.team)
					.success(function(res) {
						console.log('teamPerf: ', res.perf)
						stats.card.teamPerf = res.perf
					})
			})
		// views: gameHistory, playerPerf
			// run models.player() through roster
	}

	var initController = function() {
		if (stats.params.gameID) 	stats.gameCard(stats.params.gameID)
		if (stats.params.teamID) 	stats.teamCard(stats.params.teamID)
		if (stats.params.playerID) 	stats.playerCard(stats.params.playerID)
	}
	
	initController()

/*
	stats.newCard = function() {
		// change state
		// shuffle positions
		// fire relevant loading function
	}

	stats.fireHeader = function() {
		// change view, shuffle positions
	}
	// combining these two into one?

	stats.fireDetail = function() {} // eh, we'll see about this
*/
})