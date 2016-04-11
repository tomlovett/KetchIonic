angular.module('Ketch').factory('server', ['$http', function($http) {

	var addr = 'http://localhost:3000'

	var srv = {}

	srv.user = function(id) {
		// load player
		// load player's teams
	}

	srv.player = function(id) {
		// call to server for player using id
		// return full player
	}

	srv.team = function(id) {
		// call to server for team using id
		// return full team
	}

	// Game
	srv.score = function(result, point) {
		// pass to back-end for filing
		// return res.data.score
	}

	return srv

}])