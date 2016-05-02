angular.module('Ketch')
.controller('statsCtrl', function(models, server) {

	var stats = this
	console.log('statsCtrl')

	stats.header = null
	stats.card   = null
	stats.detail = null

	stats.history = []

/*
	stats.newCard = function() {}

	stats.fireHeader = function() {}

	stats.fireDetail = function() {} // eh, we'll see about this
*/
})