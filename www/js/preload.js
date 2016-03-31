angular.module('Ketch').factory('preloads', [function() {

	var  pre = {}

	pre.playerDB = {
		0: {_id: 0, first: 'Tom', last: 'Lowell', handle: 'Tom', gender: 'm', games: [], points: [], email: 'tom', password: 'pass', },
		1: {_id : 1, first: 'Dave', last: 'Zybert', handle: 'Zy', gender: 'm', games: [], points: [], },
		2: {_id : 2, first: 'Julie', last: 'Hamkin', handle: 'Hammie', gender: 'w', games: [], points: [], },
		3: {_id : 3, first: 'Jake', last: 'Williams', handle: 'Jake', gender: 'm', games: [], points: [], },
		4: {_id : 4, first: 'Allie', last: 'G', handle: 'Allie', gender: 'w', games: [], points: [], },
		5: {_id : 5, first: 'Alex', last: 'Komo', handle: 'Kosti', gender: 'm', games: [], points: [], },
		6: {_id : 6, first: 'Mike', last: 'Rowell', handle: 'Micro', gender: 'm', games: [], points: [], },
		7: {_id : 7, first: 'Hannah', last: 'BoBannah', handle: 'Scout', gender: 'w', games: [], points: [], } ,
		8: {_id : 8, first: 'Courtney', last: 'Boosh', handle: 'Court', gender: 'w', games: [], points: [], } ,
		9: {_id : 9, first: 'Stan', last: 'LeMan', handle: 'Stan', gender: 'm', games: [], points: [], } ,
		10: {_id : 10, first: 'Caitlin', last: 'Indigo', handle: 'Caitlin', gender: 'w', games: [], points: [], } ,
		11: {_id : 11, first: 'Johnny', last: 'Indigo', handle: 'Johnny', gender: 'm', games: [], points: [], },
		12: {_id : 12, first: 'Lauren', last: 'CurryPot', handle: 'Laur-Laur', gender: 'w', games: [], points: [], },	
		13: {_id : 13, first: 'Ben', last: 'McDonald', handle: 'Ben', gender: 'm', games: [], points: [], },
		14: {_id : 14, first: 'Jon', last: 'B', handle: 'Jon', gender: 'm', games: [], points: [], },		
	}

	pre.teamDB = {
		100 : { _id: 100, name: 'Dark Side', games: [], liveGame: {}, 
			roster: [0,1,2,3,4,5,6,7,8,9,10,11]	},
		101: { _id: 101, name: 'SPAM', games: [], liveGame: {}, roster: [0,1,2,3,4,5,6,7,8,9,12,13,14] }
	}


	return pre
}])