angular.module('Ketch')
.controller('statsCtrl', function(models, server) {

	var stats = this
	console.log('statsCtrl')

	stats.models = models

	stats.player = null
	stats.team   = null
	stats.game   = null
	stats.games  = null
	stats.points = null
	stats.total  = null
	stats.plusMinus = null

	stats.fireTeam = function(team) {
		stats.team = team
		stats.load(team._id, 'team', 'games')
		$state.go('stats.games')
	}

	stats.firePlayer = function(player, type) {
		stats.player = player
		stats.load(player._id, 'player', type)
		$state.go('stats.' + type)
	}

	stats.load = function(id, group, type) {
		// group = (team || player), type = (games || points)
		server.loadStats(id, group, type)
			.success(function(res) {
				console.log('load -> res: ', res)
				stats.player = res.player // models.player(res.player) ???
				stats.team   = res.team // models.team(res.team) ???
				stats.games  = res.games
				stats.points = res.points
			})
	}

	stats.loadGame = function(id) {
		server.gameStats(id)
			.success(function(res) {
				console.log('loadGame -> res: ', res)
				stats.game = res.game
				models.team(stats.game.teams[0])
				stats.game.roster.forEach(function(player) {
					models.player(player)
				})
				stats.total     = res.total
				stats.plusMinus = res.plusMinus
			})
	}

})