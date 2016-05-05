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
				server.team(stats.card.teams[0])
					.success(function(res) {
						stats.card.teams[0] = res.team
						res.team.roster.forEach(function(player) {
							models.player(player)
						})
					})
				if (stats.card.teams[1]) {
					server.team(stats.card.teams[1])
						.success(function(res) {
							stats.card.teams[1] = res.team
							res.team.roster.forEach(function(player) {
								models.player(player)
							})
						})
				}
				server.gamePerf(id)
					.success(function(res) {
						stats.card.perf = res.perf
					})
			})
		// views: scoreSummary, playerPerformance
	}

	stats.playerCard = function(id) {
		$state.go('stats.player', {playerID: id})
		setHeader()
		server.player(id)
			.success(function(res) {
				stats.card = res.player
				server.playerTeams(id)
					.success(function(res) {
						stats.card.teams = res.teams
					})
				server.playerPerf(id)
					.success(function(res) {
						stats.card.perf = {}
						stats.card.perf.games  = res.perf.games
						// load all teams for games
						stats.card.perf.points = res.perf.points
						stats.card.perf['+/-'] = res.perf['+/-']
					})
				server.playerGames(id)
					.success(function(res) {
						stats.card.games = res.games
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
						stats.card.teamPerf = res.perf
						// _id's -> playerObj
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