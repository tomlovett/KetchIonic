angular.module('Ketch', ['ionic', 'ui.router'])

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
		templateUrl : '/templates/login.html',
		controller  : 'entry'
	})
	// Game
	.state('game', {
		url         : '/game',
		controller  : 'gameCtrl'
	})
	.state('game.play', {
		url         : '/play',
		views: {
			'menuContent': {
				templateUrl : '/templates/scoreboard.html',
			}
		}
	})			
	.state('game.play.subs', {
		url         : '/subs',
		templateUrl : '/templates/subs.html',
	})
	.state('game.play.inPlay', {
		url         : '/inPlay',
		templateUrl : '/templates/inPlay.html',
	})	
	// 	.state('game.scoreSummary', {
	// 		url         : '/scoreSummary',
	// 		templateUrl : '/templates/game/scoreSummary.html',
	// 	})
	// Team management
	.state('team' , {
		url         : '/team',
		templateUrl : 'templates/teams.html',
		controller  : 'teamMgmt'
	})

	$urlRouterProvider.otherwise('/login')
})