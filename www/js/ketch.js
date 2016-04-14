angular.module('Ketch', [
	'ionic', 
	'ui.router'
])

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

.config(function($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor')
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
		url        : '/game',
		abstract   : true,
		controller : 'gameCtrl', // as game,
		// templateUrl: '/templates/sansMenu.html',
		template: '<ion-nav-view></ion-nav-view>'
		// plain template to hide sidemenu
	})
	.state('game.play', {
		url         : '/play',
		templateUrl : '/templates/scoreboard.html',
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
		templateUrl : 'templates/menu.html',
		controller  : 'teamMgmt' // as team
	})
	// add more team sub-states
		// url: ..., views: { 'mainContent' : {templateUrl: ... } }
	// stats
		// player
			// expansions
	// ratings
	$urlRouterProvider.otherwise('/login')
})