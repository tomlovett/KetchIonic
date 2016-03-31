angular.module('Ketch').factory('data', ['$http', 'preloads', function($http, preloads) {

	var server = 'http://localhost:3000'

	var data = {}

	data.user      = null
	data.userTeams = []
	data.teams     = {}
	data.players   = {}
	data.game      = null
	data.point     = {}

	data.initPreloads = function() {
		data.user = preloads.playerDB[0]
		data.userTeams = [100, 101]
		console.log('preloads complete')
	}

	data.player = function(playerID) {
		if (data.players[playerID])  return data.players[playerID]
		else {
			if (typeof playerID == "number") { // preloaded players
				var player = preloads.playerDB[playerID]
			} else {
				'call to server'
			}
			data.players[player._id] = player
			return player
		}
	}

	data.team = function(teamID) {
		if (data.teams[teamID])  return data.teams[teamID]
		else {
			if (typeof teamID == "number") { // preloaded teams
				var team = preloads.teamDB[teamID]
			} else {
				'call to server'
			}
			data.teams[team._id] = team
			return team
		}
	}

	data.hotTeam = function(team) {
		var index = data.userTeams.indexOf(team)
		data.userTeams.unshift(data.userTeams.splice(index, 1)[0])
	}

// Game \\
	data.initGame = function(team) {
		// create game  in DB
		// set to data.game
	}

	data.recordScore = function(result, line) {
		if (result) { data.game.score[0] += 1 }
		else		{ data.game.score[1] += 1 }
		data.point.line = line
		// pass game/point to database
		data.point = {}
		return 'game.score'
	}

	data.stat = function(player, stat) {
		data.point.stats[stat] = player
		// other recording?
	}

// not touching any of the shit below this

// Player Management \\
	data.updatePlayer = function(player) {
		'save player to database'
	}

	data.updateTeam = function(team) {
		'save team to database'
	}

// Stats \\
// hold off; pass full player for the time being, optimize later
	data.playerPoints = function(playerID) {
		'return only point history'
	}

	data.playerGames = function(playerID) {
		'return only game history'
	}

	data.teamPoints = function(teamID) {
		'return only point history'
	}

	data.teamGames = function(teamID) {
		'return only game history'
	}

	data.points = function(ID, type) {
		'type is Player/Team'
	}

	data.games = function(ID, type) {
		''
	}

	data.callStats = function(objID, dataType, statType) {}

	data.loadUser = function(playerID) {}

	return data

}])