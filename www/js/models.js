angular.module('Ketch').factory('models', function(server) {

	var m = {}
	
	m.teams   = {}
	m.players = {}
	m.roster  = []

	m.game  = null
	m.point = { stats: {} }

	m.myTeams = function() {
		server.myTeams()
			.success(function(res) { // returns object of team objects
				res.forEach(function(team) {
					m.teams[team._id] = team
				})
				return m.teams
			})
	}

	m.player = function(playerID) {
		console.log('models.player -> playerID: ', playerID)
		if (m.players[playerID])  return m.players[playerID]
		server.player(playerID)
			.success(function(res) {
				m.players[res._id] = res
				return m.players[playerID]
			})		
	}

	m.team = function(teamID) {
		if (m.teams[teamID])  return m.teams[teamID]
		server.team(teamID)
			.success(function(res) {
				console.log('m.team -> res: ', res)
					m.teams[res._id] = res
					return m.teams[teamID]
			})
	}

	m.callRoster = function(teamID) {
		server.roster(teamID)
			.success(function(roster) {
				m.roster = roster
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
				console.log('createTeam -> res: ', res)
				m.teams[res._id] = res
				console.log('m.teams[res._id] : ', m.teams[res._id])
				return res
			})
	}

	m.updateTeam = function(team) {
		server.updateTeam(team)
			.success(function(res) {
				console.log('updateTeam -> res: ', res)
				m.teams[res._id] = res
				return res
			})
	}

	return m

})