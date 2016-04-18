angular.module('Ketch').factory('server', ['$http', function($http) {
// cut out dependency later

	var addr = 'http://localhost:3000'

	var srv = {}

	srv.me = function() {
		return $http.get(addr + '/api/player')
	}

	srv.myTeams = function() {
		return $http.get(addr + '/api/team/playerTeams/')
	}

	// Player management
	srv.player = function(player) {
		return $http.get(addr + '/api/player/' + player._id)
	}

	srv.createPlayer = function(player) {
		return $http.post(addr + '/api/player', player)
	}

	srv.updatePlayer = function(player) {
		return $http.put(addr + '/api/player/' + player._id, player)
	}

	// Team management
	srv.team = function(team) {
		return $http.get(addr + '/api/team/' + team._id)
	}

	srv.createTeam = function(team) {
		return $http.post(addr + '/api/team', team)
	}

	srv.updateTeam = function(team) {
		return $http.put(addr + '/api/team/' + team._id)
	}

	// Game
	srv.game = function(game) {
		return $http.get(addr + '/api/game/' + game._id)
	}

	srv.newGame = function(game) {
		return $http.post(addr + '/api/game', game)
	}

	srv.updateGame = function(game) {
		return $http.put(addr + '/api/game/' + game._id, game)
	}

	return srv

}])