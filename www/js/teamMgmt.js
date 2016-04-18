angular.module('Ketch')
.controller('teamMgmt', ['$ionicModal', 'models', function($ionicModal, models, $scope) {

	var mgmt = this
	console.log('teamMgmt')

	mgmt.modals = {}

	// $ionicModal.fromTemplateUrl('templates/editTeam.html', {
	// 	scope: $scope,
	// 	// focusFirstInput: true
	// })
	// 	.then(function(modal) { mgmt.modals.team = modal })

	$ionicModal.fromTemplateUrl('templates/editPlayer.html', {
		// scope: mgmt,
		focusFirstInput: true
	})
		.then(function(modal) { 
			mgmt.modals.player = modal
			console.log('modal: ', modal)
		}) // can't tie modal to mgmt data management

	mgmt.team   = null
	mgmt.roster = []
	mgmt.player = null

	var initController = function() {
		console.log('Loading you...')
		if (!models.user)			models.me()
		console.log('Loading your teams...')
		if (!models.teams.length)	models.myTeams()
		console.log('Ready to go!') // not tied to actual completion
	}

	initController()

	mgmt.focusTeam = function(team) {
		mgmt.roster = []
		team.roster.forEach(function(playerID) {
			mgmt.roster.push(models.player(playerID))
		})
	}

// these two sections can be combined into one modular section; not fully positive I could do that without breaking something, so I'm going to leave as is for now
	mgmt.managePlayer = function(player) { // pass {} in html
		mgmt.player = player
		mgmt.modals.player.show()
	}

	mgmt.submitPlayer = function() {
		console.log('submitPlayer fired')
		if (mgmt.player._id) { // new players will not have an _id property
			models.updatePlayer(mgmt.player)
		} else {
			models.createPlayer(mgmt.player)
		}
		modals.player.hide()
		mgmt.player = {}
	}

	mgmt.closePlayer = function() {
		modals.player.hide()
	}

	mgmt.manageTeam = function(team) { // pass {} in html
		mgmt.team = team
		modals.team.show()
	}

	mgmt.submitTeam = function() {
		if (mgmt.team._id) { // new teams will not have an _id property
			models.updateTeam(mgmt.team)
		} else {
			models.createTeam(mgmt.team)
		}
		mgmt.modals.team.hide()
		mgmt.team = {}
	}

	mgmt.closeTeam = function() {
		modals.team.hide()
	}

}])