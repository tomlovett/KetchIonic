angular.module('Ketch').factory('statServ', function(server) {

	statServ = {}

	statServ.loadTeamCard = function(id) {
		var card = {}
		server.team(id)
			.success(function(res){
				card = res.team
				server.teamGames(id)
					.success(function(res) {
						card.games  = res.games
						card.record = res.record
					})
			})
	}

	statServ.playerName = function(player) {
		if (player.handle == player.first)
			return player.first + ' ' + player.last
		else
			return player.handle +' ('+ player.first+' '+player.last+')'
	}

	statServ.teamGame = function(game) {
		return game.score[0] + '-' + game.score[1] + 
		stats.models.team(game.teams[0]).name + ' vs. ' + (game.teams[1].name || 'THEM')
	}

	return statServ
})