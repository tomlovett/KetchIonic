angular.module('Ketch')
.controller('gameCtrl', function(models, $state, $timeout) {

	var gm = this

	gm.models = models

	console.log('gameCtrl')

	gm.player = null
	gm.stat   = null

	var stat = {}

	gm.oops = false
	gm.back = null

	gm.field = []
	gm.bench = []
	gm.team  = null

	var initController = function() {
		gm.bench = models.roster
		if (!models.game)		models.initGame()
	}
	// game inits the first time, but not subsequent times
	// need to restructure how games are initiated

	initController()

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

	gm.recordStat = function(clicked) {
		if (typeof clicked === 'string') { // stats pass string values
			if (stat.type)	  stat.type = null    
			else              stat.type = clicked 
		} else {						   // players pass player objects
			if (stat.player)  stat.player = null
			else 			  stat.player = clicked._id
		}
		checkStat()
	}

	var checkStat = function() {
		if (stat.player && stat.type) {
			console.log('stat recorded!')
			models.stat(stat.player, stat.type)
			stat = {}		
		}
	}

	gm.closeGame = function() {
		models.closeGame()
		$state.go('team.yourTeams')
		// or stats or some shit
		// confirm, route to stats recap
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

	gm.scoreboard = function() {
		if (gm.back) { 
			$state.go(gm.back)
			gm.back = null
		} else {
			gm.back = $state.current  // "subs" or "inPlay"
			$state.go('game.scoreSummary')
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