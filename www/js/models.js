angular.module('Ketch').factory('models', function(server) {

	var m = {}
	
	m.teams   = {}
	m.players = {}
	m.roster  = []

	m.game     = null
	m.gameTeam = null
	m.point    = { line: [], stats: {} }

	m.myTeams = function() {
		server.myTeams()
			.success(function(res) { // returns array of team objects
				res.forEach(function(team) {
					m.teams[team._id] = team
				})
				return m.teams
			})
	}

	m.player = function(playerID) {
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

	m.rosterMove = function(obj) {
		// obj = { teamID: 'abc', playerID: 'abc', add: Bool }
		server.rosterMove(obj)
			.success(function(res) {
				console.log('addToRoster -> res: ', res)
				m.teams[res._id] = res
			})
	}

// Game \\
	m.initGame = function(gameObj) {
		m.gameTeam = m.team(gameObj.teams[0])
		server.newGame(gameObj)
			.success(function(res) {
				m.game = res.game
			})
	}

	m.recordScore = function(result) {
		if (result) { m.game.score[0] += 1 }
		else		{ m.game.score[1] += 1 }
		// keeping the above line so feedback is instantenous
		m.point.result = result
		m.game.points.push(m.point)
		server.updateGame(m.game)
			.success(function(res) {
				m.game = res
				m.point = { line: [], stats: {} }
			})
	}

	m.stat = function(player, stat) {
		m.point.stats[stat] = player
	}

	m.line = function(line) {
		line.forEach(function(player) {
			m.point.line.push(player._id)
		})
	}

// Management \\
	m.updatePlayer = function(player) {
		server.updatePlayer(player)
			.success(function(res) {
				m.players[player._id] = res.player
				var index = m.roster.indexOf(res.player)
				if (index)  m.roster[index] = res.player 
			})
	}

	m.createPlayer = function(player) {
		server.createPlayer(player)
			.success(function(res) {
				for (teamID in res.teams) {
					if (res.teams[teamID]) {
						server.rosterMove({ team: teamID, player: res.player._id, add: true})
							.success(function(resTwo) {
								m.teams[resTwo._id] = resTwo
								m.callRoster(resTwo._id)
							})
					}
				}
			})
	}

	m.createTeam = function(team) {
		server.createTeam(team)
			.success(function(res) {
				m.teams[res._id] = res
				return res
			})
	}

	m.updateTeam = function(team) {
		server.updateTeam(team)
			.success(function(res) {
				m.teams[res._id] = res
				return res
			})
	}

	return m

})