requirejs.config({
	deps: [ 'main' ],
	//urlArgs: Date.now(),

	paths: {
		// directory aliases
		component: '../components',

		// external
		remote: '../components/remote',
		remoteStorageAngular: '../components/remotestorage.angular',
		remoteStorage: '../vendor/remotestorage.min',
		angularFire: 'https://cdn.firebase.com/libs/angularfire/0.3.0/angularfire.min',
		firebase: 'https://cdn.firebase.com/v0/firebase',
	},

	shim: {
		remoteStorageAngular: [ 'remoteStorage' ],
		angularFire: [ 'firebase' ],
		remote: [
			'remoteStorageAngular',
			'angularFire',
		],
	}
});
