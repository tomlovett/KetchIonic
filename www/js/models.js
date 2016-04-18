angular.module('Ketch').factory('models', function(server, preloads) {

	var m = {}

	m.user      = null // playerObj
	
	m.teams     = {}
	m.players   = {}

	m.hotTeam   = null
	m.game      = null
	m.point     = { stats: {} }

	m.me = function() {
		server.me()
			.success(function(res){
				m.user = res.player
			})
	}

	m.myTeams = function() {
		server.myTeams()
			.success(function(res) {
				if (!res.teams) 	return
				res.teams.forEach(function(team) {
					m.teams[team._id] = team
				})
			})
	}

	m.player = function(playerID) {
		if (m.players[playerID])  return m.players[playerID]
		server.player(playerID)
			.success(function(res) {
				if (res.success) {
					m.players[player._id] = res.player
					return m.players[playerID]
				}
			})		
	}

	m.team = function(teamID) { // unnecessary?
		if (m.teams[teamID])  return m.teams[teamID]
		server.team(teamID)
			.success(function(res) {
				if (res.success) {
					m.teams[team._id] = res.team
					return m.teams[teamID]
				}
			})
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
		// keeping the above line so feedback is instantenous
		m.point.result = result
		server.score(m.point)
			.success(function(res) {
				console.log('Point recorded!')
				m.game = res.game
				m.point = { stats: {} }
			})
	}

	m.stat = function(player, stat) {
		m.point.stats[stat] = player
		// server.stat(player, stat)
	}

	m.line = function(line) {
		m.point.line = line
	}

// Management \\
	m.updatePlayer = function(player) {
		server.updatePlayer(player)
			.success(function(res) {
				if (res.success) {
					m.players[player._id] = res.player
					console.log('Player updated!')
				}
			})
	}

	m.createPlayer = function(player) {
		server.createPlayer(player)
			.success(function(res) {
				if (res.success) {
					res.teams.forEach(function(team) {
						team.roster.push(player._id)
						m.updateTeam(team)
					})
				} else {
					console.log('Error: ', res.message)
				}
			})
	}

	m.createTeam = function(team) {
		server.createTeam(team)
			.success(function(res) {
				if (!res.success) {
					console.log('Something went wrong...')
					console.log('Error: ', res.message)
					return
				}
				m.teams[res.team._id] = res.team
			})
	}

	m.updateTeam = function(team) {
		server.updateTeam(team)
			.success(function(res) {
				if (res.success) {
					m.teams[team._id] = res.team
					console.log('Team updated!')
				}
			})
	}

	return m

})