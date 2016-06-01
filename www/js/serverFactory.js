angular.module('Ketch').factory('server', function($http) {

	var addr = 'http://localhost:3000'

	var srv = {}

	srv.myTeams = function() {
		return $http.get(addr + '/api/team/myTeams')
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

	srv.newGame = function(team) {
		return $http.post(addr + '/api/game', team)
	}

	srv.point = function(game, point) {
		return $http.put(addr + '/api/game/point/' + game._id, point)
	}

	srv.updateGame = function(game) {
		return $http.put(addr + '/api/game', game)
	}

	srv.undoPoint = function(game) {
		return $http.get(addr + '/api/game/undoPoint/' + game._id)
	}

	srv.closeGame = function(game) {
		return $http.get(addr + '/api/game/close/' + game._id)
	}

	// Stats
	srv.playerTeams = function(playerID) {
		return $http.get(addr + '/api/team/playerTeams/' + playerID)
	}

	srv.teamGames = function(teamID) {
		return $http.get(addr + '/api/stats/team/games/' + teamID)		
	}

	srv.playerGames = function(playerID) {
		return $http.get(addr + '/api/stats/player/games/' + playerID)		
	}

	srv.playerPerf = function(playerID) {
		return $http.get(addr + '/api/stats/player/performance/' + playerID)		
	}

	srv.teamPerf = function(team) {
		return $http.post(addr + '/api/stats/team/performance/' + team._id, team.roster)		
	}

	srv.gamePerf = function(gameID) {
		return $http.get(addr + '/api/stats/game/performance/' + gameID)				
	}

	return srv

})