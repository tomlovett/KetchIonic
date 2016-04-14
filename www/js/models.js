angular.module('Ketch').factory('models', function(server, preloads) {

	var m = {}

	m.user      = null
	m.userTeams = []
	m.teams     = {}
	m.players   = {}
	m.game      = null
	m.point     = { stats: {} }

	m.loadUser = function(userID) {
		m.user = userID
		server.playerTeams(userID)
			.success(function(res) {
				console.log(res)
				m.userTeams = res
				// not sure what will be returned this way
			})
	}

	m.initPreloads = function() {
		m.user = preloads.playerDB[0]
		m.userTeams = [100, 101]
		console.log('preloads complete')
	}

	m.player = function(playerID) {
		if (m.players[playerID])  return m.players[playerID]
		else {
			if (typeof playerID == "number") { // preloaded players
				var player = preloads.playerDB[playerID]
			} else {
				var player = server.player(playerID)
			}
			m.players[player._id] = player
			return player
		}
	}

	m.team = function(teamID) {
		if (m.teams[teamID])  return m.teams[teamID]
		else {
			if (typeof teamID == "number") { // preloaded teams
				var team = preloads.teamDB[teamID]
			} else {
				var team = server.team(teamID)
			}
			m.teams[team._id] = team
			return team
		}
	}

	m.hotTeam = function(team) {
		var index = m.userTeams.indexOf(team)
		m.userTeams.unshift(m.userTeams.splice(index, 1)[0])
	}

// Game \\
	m.initGame = function() {
		m.game = {
			score  : [0, 0],
			points : []
		} // placeholder
		// post to server with teamID, work off returned object
		// store full game locally, post to update?
	}

	m.recordScore = function(result) {
		if (result) { m.game.score[0] += 1 }
		else		{ m.game.score[1] += 1 }
			// keeping the above line so feedback is instantenous?
		m.point.result = result
		m.game.score = server.score(m.point)
		m.point = { stats: {} }
	}

	m.stat = function(player, stat) {
		m.point.stats[stat] = player
		// server.stat(player, stat)
	}

	m.line = function(line) {
		m.point.line = line
	}

// not touching any of the shit below this

// Player Management \\
	m.updatePlayer = function(player) {
		'save player to database'
	}

	m.updateTeam = function(team) {
		'save team to database'
	}

	return m

})