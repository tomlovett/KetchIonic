angular.module('Ketch')
.controller('statsCtrl', function(models, server) {

	var stats = this
	console.log('statsCtrl')

	stats.header = null  // text, bg-color
	stats.card   = null
	stats.detail = null

	// stats.history = []

	var setHeader = function() {
		stats.header = stats.card
		stats.header.text
		stats.header.bgColor
	}

	stats.gameCard = function() {
		// load game, assign to stats.card
		// populate teams
			// rosters, too?
	}

	stats.playerCard = function() {
		// load games, points.length, plusMinus
		// playerTeams populated
	}

	stats.teamCard = function() {
		// record, roster
	}


/*
	stats.newCard = function() {
		// change state
		// shuffle positions
		// fire relevant loading function
	}

	stats.fireHeader = function() {
		// change view, shuffle positions
	}
	// combining these two into one?

	stats.fireDetail = function() {} // eh, we'll see about this
*/
})