angular.module('Ketch').factory('data', ['$http', 'preloads', function($http, preloads) {

	var server = 'http://localhost:3000'

	var data = {}

	data.user     = null
	data.teams    = []
	data.fullTeam = {}
	data.players  = {}
	data.game     = null

	data.initPreloads = function() {
		data.user = preloads.playerDB[0]
		data.teams = [100, 101]
	}

	data.player = function(playerID) {
		if (data.players[playerID])  return data.players[playerID]
		else {
			if (typeof playerID == Number) {
				var player = preload.playerDB[playerID]
			} else {
				'call to server'
			}
			// add to map
			'does not send point or game history'
		}
	}

	data.team = function(teamID) {
		if (data.teams[teamID])  return data.teams[teamID]
		else {
			if (typeof team == Number) {
				var team = preload.teamDB[teamID]
			} else {
				'call to server'
			}
			// add to map
			// does not send point or game history
		}
	}

	data.hotTeam = function(team) {
		var index = data.teams.indexOf(team)
		data.teams.unshift(data.teams.splice(index, 1)[0])
	}

// Player Management \\
	data.updatePlayer = function(player) {
		'save player to database'
	}

	data.updateTeam = function(team) {
		'save team to database'
	}

// Game \\
	data.initGame = function() {
		data.teams[0]
		'create Game in DB, pass to data'
	}

	data.passPoint = function(point) {
		'push point to game in DB'
	}

	data.closeGame = function() {
		'close out game'
	}

// Stats \\
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