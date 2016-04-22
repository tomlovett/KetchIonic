angular.module('Ketch').factory('server', function($http) {

	var addr = 'http://localhost:3000'

	var srv = {}

	srv.me = function() {
		return $http.get(addr + '/api/player')
	}

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

	// srv.score = function(game) {
	// 	return $http.put(addr + '/api/game', game)
	// }

	srv.updateGame = function(game) {
		return $http.put(addr + '/api/game', game)
	}

	return srv

})