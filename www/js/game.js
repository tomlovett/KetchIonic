angular.module('Ketch')
.controller('gameCtrl', function(models, $state, $timeout) {

	var gm = this

	gm.models = models

	console.log('gameCtrl')

	gm.player = null
	gm.stat   = null

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
		$timeout(function() { gm.oops = false }, 7500)
	}

	gm.recordStat = function(clicked) {
		if (typeof clicked === 'string') { // stats pass string values
			if (gm.stat)	gm.stat = null    
			else            gm.stat = clicked 
		} else {						   // players pass player objects
			if (gm.player)  gm.player = null
			else 			gm.player = clicked._id
		}
		if (gm.player && gm.stat) {
			console.log('stat recorded!')
			models.stat(gm.player, gm.stat)
			gm.player = null
			gm.stat   = null			
		}
	}

	gm.closeGame = function() {
		models.closeGame()
		$state.go('team.yourTeams')
		// or stats or some shit
	}

	// Substitutions
	gm.move = function(player, from, to) {
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
			gm.back = $state.current
			$state.go('game.scoreSummary')
		}
	/* scoreSummary can be fired from "subs" or "inPlay"; "gm.back" stored
	so user can be routed back to proper screen*/
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