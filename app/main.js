define(function(require) {
	'use strict';

	require('a/a');
	require('component/b/b');

	angular.module('boilerplate', [
		'module-a',
		'module-b',
	])

	.controller('MasterCtrl', function($scope, $timeout, test, tast) {
		console.log(test, tast);
		$timeout(function() {
			$scope.loaded = true;
		}, 2000);
	});

	angular.bootstrap(document.documentElement, [ 'boilerplate' ]);
});
