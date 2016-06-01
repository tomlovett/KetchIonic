angular.module('Ketch')
.controller('gameCtrl', function(models, $state, $timeout) {

	var gm = this

	gm.models = models

	console.log('gameCtrl')

	var stat = {}

	gm.oops = false
	gm.back = null

	gm.field = []
	gm.bench = []

	gm.startGame = function() {
		if (gm.alias) 			{ 'load alias' }
		else if (gm.opponent) 	{'pass to models'}
		$state.go('game.subs')
		gm.bench = models.roster
		models.initGame(gm.alias, gm.opponent) // including, alias, opponent
		gm.alias    = null
		gm.opponent = null
	}

// Game Flow
	gm.doneSubs = function() {
		models.line(gm.field)
		gm.oops = true
		$state.go('game.inPlay')
		$timeout(function() { gm.oops = false }, 7500)
	}

	gm.recordScore = function(result) {
		models.recordScore(result)
		gm.oops = true
		$state.go('game.subs')
		$timeout(function() { gm.oops = false }, 10000)
	}

	gm.closeGame = function() {
		$state.transitionTo('stats.game', {gameID: models.game._id}, 
			{relative: 'stats', location: 'replace'})
		// doesn't change URL
		models.closeGame()
	}

	gm.scoreboard = function() {
		if (gm.back) { 
			$state.go(gm.back)
			gm.back = null
		} else {
			gm.back = $state.current  // "subs" or "inPlay"
			$state.go('game.scoreSummary')
		}
	}

// Substitutions
	gm.move = function(player, from, to) {  // "from" and "to" are bench/field
		var index = from.indexOf(player)
		to.push(from.splice(index, 1)[0])
	}

	gm.clearLine = function() {
		while (gm.field.length > 0) {
			gm.move(gm.field[0], gm.field, gm.bench)
		}
	}

// Recording statistics
	gm.statPlayer = function(clicked) {
		if (stat.player)	stat.player = null
		else				stat.player = clicked._id
		checkStat()
	}

	gm.statType = function(clicked) {
		if (stat.type)		stat.type = null
		else				stat.type = clicked
		checkStat()
	}

	var checkStat = function() {
		if (stat.player && stat.type) {
			console.log('stat recorded! stat: ', stat)
			models.markStat(stat)
			stat = {}		
		}
	}

// Oops!
	gm.goBack = function() {
		$state.go('game.subs') // change to ui-sref in html
	}

	gm.undoScore = function() {
		models.undoPoint()
		$state.go('game.inPlay')
	}

})