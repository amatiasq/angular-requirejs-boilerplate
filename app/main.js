define(function(require) {
	'use strict';

	require('a');
	require('component/b');

	angular.module('boilerplate', [
		'module-a',
		'module-b',
	])

	.controller('MasterCtrl', function($scope, test, tast) {
		console.log(test, tast);
		$scope.loaded = true;
	});

	angular.bootstrap(document.documentElement, [ 'boilerplate' ]);
});
