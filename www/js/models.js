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
				res.teams.forEach(function(team) {
					m.teams[team._id] = team
				})
			})
	}

	m.player = function(playerID) {
		if (m.players[playerID])  return m.players[playerID]
		server.player(playerID)
			.success(function(res) {
				m.players[res.player._id] = res.player
				return m.players[playerID]
			})		
	}

	m.team = function(teamID) {
		if (m.teams[teamID])  return m.teams[teamID]
		server.team(teamID)
			.success(function(res) {
				m.teams[res.team._id] = res.team
				res.team.roster.forEach(function(playerID) {
					m.player(playerID)
				})
				return m.teams[teamID]
			})
	}

	m.loadRoster = function(team) {
		server.roster(team._id)
			.success(function(res) {
				m.roster = res.roster
				m.roster.forEach(function(player) {
					m.players[player._id] = player
				})
			})
	}

	m.rosterMove = function(playerID, team) {
		console.log('rosterMove')
		var index = team.roster.indexOf(playerID)
		if (index === -1) 	team.roster.push(playerID)
		else				team.roster.splice(index, 1)
		m.updateTeam(team)
	}


// Management \\
	m.updatePlayer = function(player, status) {
		server.updatePlayer(player)
			.success(function(res) {
				m.players[player._id] = res.player
				verifyRosterStatus(res.player, status)
				return res.player
			})
	} // can combine these two into one with a little finagling

	m.createPlayer = function(player, status) {
		server.createPlayer(player)
			.success(function(res) {
				m.players[res.player._id] = res.player
				verifyRosterStatus(res.player, status)
				return res.player
			})
	}

	var verifyRosterStatus = function(player, status) {
		for (var teamID in status) {
			var team   = m.teams[teamID]
			var index  = team.roster.indexOf(player._id)
			var actual = (index !== -1)
			if (status[teamID] !== actual) {
				m.rosterMove(player._id, team)
			}
		}
	}

	m.createTeam = function(team) {
		server.createTeam(team)
			.success(function(res) {
				m.teams[res.team._id] = res.team
				return res.team
			})
	}

	m.updateTeam = function(team) {
		server.updateTeam(team)
			.success(function(res) {
				m.teams[res.team._id] = res.team
				if (res.team._id == m.gameTeam._id) { // live updates
					m.gameTeam = res.team
					m.loadRoster(res.team)
				}
				return res.team
			})
	}

// Game \\
	m.initGame = function() {
		server.newGame({ team: m.gameTeam})
			.success(function(res) {
				m.game = res.game
			})
	}

	m.closeGame = function() {
		server.closeGame(m.game)
			.success(function(res) {
				console.log('closeGame -> res: ', res)
				m.game = null
			})
	}

	m.recordScore = function(result) {
		if (result) { m.game.score[0] += 1 }
		else		{ m.game.score[1] += 1 }
		m.point.result = result
		m.point.score  = m.game.score
		m.game.points.push(m.point)
		server.updateGame(m.game)
			.success(function(res) {
				m.game = res.game
				console.log('models.recordScore -> res.game: ', res.game)
				m.point = { line: [], stats: {} }
			})
	}

	m.undoPoint = function() {
		server.undoPoint(m.game)
			.success(function(res) {
				m.game = res.game
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

	return m

})