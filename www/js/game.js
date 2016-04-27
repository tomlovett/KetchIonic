angular.module('Ketch')
.controller('gameCtrl', function(models, $state) {

	var gm = this

	gm.models = models

	console.log('gameCtrl')

	gm.player = null
	gm.stat   = null

	gm.field = []
	gm.bench = []
	gm.team  = null

	var initController = function() {
		gm.bench = models.roster
		gm.game = {
			teams  : [models.gameTeam._id],
			score  : [0, 0],
			points : [],
			rosters: []
		}
		models.initGame(gm.game)
	}

	initController()

	// Game Flow
	gm.doneSubs = function() {
		models.line(gm.field)
		$state.go('game.inPlay')
	}

	gm.recordScore = function(result) {
		models.recordScore(result)
		$state.go('game.subs')
	}

	gm.recordStat = function(clicked) {
		if (typeof clicked === 'string') { // stats pass string values
			if (gm.stat)	{ gm.stat = null    }
			else            { gm.stat = clicked }
		} else {						   // players pass player objects
			if (gm.player)  { gm.player = null   	  }
			else 			{ gm.player = clicked._id }
		}
		if (gm.player && gm.stat) {
			console.log('stat recorded!')
			models.stat(gm.player, gm.stat)
			gm.player = null
			gm.stat   = null			
		}
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

	// gm.closeGame = function() {
	// }

	// gm.toScoreSummary = function() {
	// 	$state.go('scoreSummary')
	// }

	// gm.backToGame = function() {
	// 	$state.go('gm')
	// }

})