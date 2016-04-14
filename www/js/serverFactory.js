angular.module('Ketch').factory('server', ['$http', function($http) {

	var addr = 'http://localhost:3000'

	var srv = {}

	srv.player = function(id) {
		return $http.get(addr + '/api/player/' + id)
		// server returns player object
	}

	srv.createPlayer = function(data) {
		// post to '/api/player'; returns player object
		// add id to teams
	}

	srv.playerTeams = function(id) {
		// return id's of all teams user is on
		return $http.get(addr + '/api/playerTeams/' + id)
	}


	srv.team = function(id) {
		return $http.get(addr + '/api/team/' + id)
		// server returns team in JSON
	}

	// Game
	srv.score = function(point) {
		return $http.put(addr + '/api/score', { point: point })
		// server returns score
	}

	srv.updatePlayer = function(player) {
		return $http.put(addr + '/api/player/update', player)
	}

	srv.updateTeam = function(team) {
		return $http.put(addr + '/api/team/update', team)
	}

	return srv

}])