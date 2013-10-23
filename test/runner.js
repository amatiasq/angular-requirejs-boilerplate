//jshint camelcase:false
'use strict';

requirejs.config({
	// This is because karma puts files under base/ directory
	baseUrl: '/base/app',

	urlArgs: Date.now(),

	paths: {
		'component': '../components',
		'chai': 'bower_components/chai/chai',
		'sinon': 'lib/sinon-1.7.3',
	},

	shim: {
		'sinon': { exports: 'sinon' }
	}
});

(function() {

	var files = Object.keys(window.__karma__.files);

	var deps = files.filter(function(filename) {
		return filename.indexOf('.test.js') !== -1;
	});
	console.log(deps);

	requirejs(deps, function() {
		window.__karma__.start();
	});
})();
