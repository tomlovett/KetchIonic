angular.module('Ketch')
.controller('gameCtrl', function(models, $state) {

// auto-init game when built up enough
	var game = this

	console.log('gameCtrl')

	game.player = null
	game.stat   = null

	game.field = []
	game.bench = []

	var refreshGame = function() {
		game.game = models.pullGame()
	}

	game.doneSubs = function() {
		models.line(game.field)
		$state.go('game.play.inPlay')
	}

	game.recordScore = function(result) {
		models.recordScore(result)
		$state.go('game.play.subs')
	}

	game.recordStat = function(clicked) {
		if (typeof clicked === 'string') { // stats pass string values
			if (game.stat)     { game.stat = null    }
			else               { game.stat = clicked }
		} else {						   // players pass player objects
			if (game.player)   { game.player = null    }
			else 			   { game.player = clicked }
		}
		if (game.player && game.stat) {
			models.stat(game.player, game.stat)
			game.player = null
			game.stat   = null			
		}
	}

	game.move = function(player, from, to) {
		var index = from.indexOf(player)
		to.push(from.splice(index, 1)[0])
	}

	game.clearLine = function() {
		while (game.field.length > 0) {
			game.move(game.field[0], game.field, game.bench)
		}
	}

	// game.closeGame = function() {
	// }

	// game.toScoreSummary = function() {
	// 	$state.go('scoreSummary')
	// }

	// game.backToGame = function() {
	// 	$state.go('game')
	// }

})