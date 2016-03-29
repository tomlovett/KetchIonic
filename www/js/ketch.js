angular.module('Ketch', ['ionic, ui.router'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

		$stateProvider	
		// Login
			.state('login', {
				url         : '/login',
				templateUrl : '/public/views/login.html',
				controller  : 'entry'
			})
			.state('login.signIn', {
				url         : '/signIn',
				templateUrl : '/public/views/snippets/login/signIn.html',
				controller  : 'entry'
			})
			.state('login.signUp', {
				url         : '/signUp',
				templateUrl : '/public/views/snippets/login/signUp.html',
				controller  : 'entry'
			})
			.state('login.createSelf', {
				url         : '/signUp',
				templateUrl : '/public/views/snippets/login/createSelf.html',
				controller  : 'entry'
			})
		// Game
			.state('game', {
				url         : '/game',
				templateUrl : '/public/views/game.html',
				controller  : 'game' // ui-view, hide header?
			})
			.state('game.intro', {
				url         : '/intro',
				templateUrl : '/public/views/snippets/game/gameIntro.html',
				controller  : 'game'
			})			
			.state('game.liveGame', {
				url         : '/liveGame',
				templateUrl : '/public/views/snippets/game/liveGame.html',
				controller  : 'game'
			})			
			.state('game.scoreSummary', {
				url         : '/scoreSummary',
				templateUrl : '/public/views/snippets/game/scoreSummary.html',
				controller  : 'game' // back to game link
			})
		// Team management
			.state('team' , {
				url         : '/team',
				templateUrl : '/public/views/team.html',
				controller  : 'teamController'
			}) // Team Name in header, +Team to the side
			// .state('team.attachEmails', {
			// 	url         : '/attachEmails',
			// 	templateUrl : '/public/views/snippets/team/attachEmails.html',
			// 	controller  : 'teamController'
			// }) // one snippet for emails and roster management?
			.state('team.createPlayer', {
				url         : '/createPlayer',
				templateUrl : '/public/views/snippets/team/createPlayer.html',
				controller  : 'teamController'
			})
			.state('team.createTeam', {
				url         : '/createTeam',
				templateUrl : '/public/views/snippets/team/createTeam.html',
				controller  : 'teamController'
			})
			.state('team.editRoster', {
				url         : '/editRoster',
				templateUrl : '/public/views/snippets/team/editRoster.html',
				controller  : 'teamController'
			})
		// Rating
			.state('ratingMode' , {
				url         : '/rating',
				templateUrl : '/public/views/ratings.html',
				controller  : 'votingController'
			})
		$urlRouterProvider.otherwise('/login')
	})