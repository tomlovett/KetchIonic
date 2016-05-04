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
		controller  : 'mainCtrl as main'
	})
	// Game
	.state('game', {
		url        : '/game',
		controller : 'gameCtrl as gm',
		templateUrl : '/templates/game/scoreboard.html',
	})	
	.state('game.subs', {
		url         : '/subs',
		templateUrl : '/templates/game/subs.html',
	})
	.state('game.inPlay', {
		url         : '/inPlay',
		templateUrl : '/templates/game/inPlay.html',
	})	
	.state('game.scoreSummary', {
		url         : '/scoreSummary',
		templateUrl : '/templates/game/scoreSummary.html',
	})
	// Team management
	.state('team', {
		url         : '/team',
		abstract    : true,
		// templateUrl : '/templates/menu.html',
		template    : '<ion-nav-view></ion-nav-view>',
		controller  : 'teamMgmt as mgmt'
	})
	.state('team.yourTeams', {
		url         : '/yourTeams',
		templateUrl : '/templates/team/yourTeams.html'
	})
	.state('team.oneTeam', {
		url         : '/oneTeam',
		templateUrl : '/templates/team/oneTeam.html'
	})
	.state('team.editTeam', {
		url         : '/editTeam',
		templateUrl : '/templates/team/editTeam.html'
	})
	.state('team.editPlayer', {
		url         : '/editPlayer',
		templateUrl : '/templates/team/editPlayer.html'
	})
	.state('team.allPlayers', {
		url         : '/allPlayers',
		templateUrl : '/templates/team/allPlayers.html'
	})
	// Stats
	.state('stats', {
		url         : '/stats',
		controller	: 'statsCtrl as stats',
		templateUrl	: '/templates/stats/header.html',
	})
	.state('stats.team', {
		url         : '/team/:teamID',
		templateUrl : '/templates/stats/team.html'
	})
		.state('stats.team.gameHistory', {
		url         : '/team/:teamID/gameHistory',
		templateUrl : '/templates/stats/team.gameHistory.html'
		})
		.state('stats.team.teamPerf', {
		url         : '/team/:teamID/teamPerf',
		templateUrl : '/templates/stats/team.team.perf.html'
		})
	.state('stats.game', {
		url         : '/game/:gameID',
		templateUrl : '/templates/stats/game.html'
	})
		.state('stats.game.perf', {
			url         : '/game/:gameID/perf',
			templateUrl : '/templates/stats/game.perf.html'
		})
		.state('stats.game.scoreSummary', {
			url         : '/game/:gameID/scoreSummary',
			templateUrl : '/templates/stats/game.scoreSummary.html'
		})
	.state('stats.player', {
		url         : '/player/:playerID',
		templateUrl : '/templates/stats/player.html'
	})
		.state('stats.player.games', {
			url         : '/player/:playerID/games',
			templateUrl : '/templates/stats/player.games.html'
		})
		.state('stats.player.points', {
			url         : '/player/:playerID/points',
			templateUrl : '/templates/stats/player.points.html'
		})

	$urlRouterProvider.otherwise('/login')
})