angular.module('Ketch').factory('server', function($http) {

	var addr = 'http://localhost:3000'

	var srv = {}

	// srv.me = function() {
	// 	return $http.get(addr + '/api/player')
	// }

	srv.myTeams = function() {
		return $http.get(addr + '/api/team/playerTeams')
	}

	srv.roster = function(teamID) {
		return $http.get(addr + '/api/team/roster/' + teamID)
	}

	// Player management
	srv.player = function(playerID) {
		return $http.get(addr + '/api/player/' + playerID)
	}

	srv.createPlayer = function(player) {
		return $http.post(addr + '/api/player', player)
	}

	srv.updatePlayer = function(player) {
		return $http.put(addr + '/api/player', player)
	}

	// Team management
	srv.team = function(teamID) {
		return $http.get(addr + '/api/team/' + teamID)
	}

	srv.createTeam = function(team) {
		return $http.post(addr + '/api/team', team)
	}

	srv.updateTeam = function(team) {
		return $http.put(addr + '/api/team', team)
	}

	srv.roster = function(teamID) {
		return $http.get(addr + '/api/team/roster/' + teamID)
	}

	srv.rosterMove = function(obj) {
		return $http.put(addr + '/api/team/rosterMove', obj)
	}

	// Game
	srv.game = function(gameID) {
		return $http.get(addr + '/api/game/' + gameID)
	}

	srv.newGame = function(game) {
		return $http.post(addr + '/api/game', game)
	}

	srv.updateGame = function(game) {
		return $http.put(addr + '/api/game', game)
	}

	// Stats
	srv.loadStats = function(id, group, type) {
		// group = (team || player), type = (games || points)
		var route = '/api/stats/' + group + '/' + type + '/' + id
		return $http.get(addr + route)
	}

	srv.gameStats = function(id) {
		return $http.get(addr + '/api/stats/game/' + id)
	}

	// srv.teamGames = function(teamID) {
	// 	return $http.get(addr + '/api/stats/team/games/' + teamID)		
	// }

	// srv.teamPoints = function(teamID) {
	// 	return $http.get(addr + '/api/stats/team/points/' + teamID)		
	// }

	// srv.playerGames = function(playerID) {
	// 	return $http.get(addr + '/api/stats/player/games/' + playerID)		
	// }

	// srv.playerPoints = function(playerID) {
	// 	return $http.get(addr + '/api/stats/player/points/' + playerID)		
	// }

	srv.gamesWith = function(teamID, playerID) {
		var route = '/api/stats/gamesWith/' + teamID + '/' + playerID
		return $http.get(addr + route)		
	}

	srv.pointsWith = function(teamID, playerID) {
		var route = '/api/stats/pointsWith/' + teamID + '/' + playerID
		return $http.get(addr + route)		
	}

	srv.friends = function(playerA, playerB) {
		var route = '/api/stats/friends/' + playerA + '/' + playerB
		return $http.get(addr + route)
	}

	return srv

})