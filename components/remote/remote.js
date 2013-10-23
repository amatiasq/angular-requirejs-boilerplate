/*globals Firebase */
'use strict';


angular.module('remote-firebase', [ 'firebase' ])

.factory('remoteCollection', function(firebaseServer, angularFireCollection) {
	return function(module) {
		var url = firebaseServer + '/' + module;
		var ref = new Firebase(url);
		return angularFireCollection(ref);
	};
})

.factory('remoteBind', function(firebaseServer, angularFire) {
	return function(module, id, scope, key) {
		var url = firebaseServer + '/' + module + '/' + id;
		var ref = new Firebase(url);
		return angularFire(ref, scope, key);
	};
});


angular.module('remote-storage', [ 'remoteStorage' ])

.factory('remoteCollection', function(rsCollection) {
	return function(module) {
		return rsCollection(module);
	};
})

.factory('remoteBind', function(rsBind) {
	return function(module, id, scope, key) {
		return rsBind(module, id, scope, key);
	};
});
