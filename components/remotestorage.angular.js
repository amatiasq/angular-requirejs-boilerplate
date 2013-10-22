/*globals remoteStorage, RemoteStorage */
'use strict';

angular.module('remoteStorage', [])

.factory('guid', function() {
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	}
	return function guid() {
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
	};
})

.factory('rsModuleManager', function(guid) {
	var cache = {};
	var first = true;

	return function(moduleName) {
		if (cache[moduleName])
			return remoteStorage[moduleName];

		cache[moduleName] = true;
		var itemName = guid();

		RemoteStorage.defineModule(moduleName, function(privateClient) {

			function add(data) {
				data.id = guid();
				return save(data);
			}

			function remove(dataOrId) {
				var id = typeof dataOrId === 'string' ? dataOrId : dataOrId.id;
				return privateClient.remove(id);
			}

			function save(data) {
				return privateClient.storeObject(itemName, data.id, data);
			}

			function get(id) {
				return privateClient.getObject(id);
			}

			function list() {
				return privateClient.getAll('');
			}

			function init() {
				privateClient.cache('', true);
			}

			return {
				exports: {
					on: privateClient.on,
					init: init,
					list: list,
					get: get,
					add: add,
					save: save,
					remove: remove,
				}
			};
		});

		remoteStorage.access.claim(moduleName, 'rw');

		if (!localStorage['rs-module-' + moduleName]) {
			remoteStorage[moduleName].init();
			localStorage['rs-module-' + moduleName] = 'true';
		}

		if (first) {
			remoteStorage.displayWidget();
			first = false;
		}

		return remoteStorage[moduleName];
	};
})

.factory('rsModel', function(rsModuleManager) {

	function RsModel() {
		this.attributes = {};
	}
	RsModel.prototype = {
		constructor: RsModel,
		get: function(key) {
			return this.attributes[key];
		},
		set: function(key, value) {
			this.attributes[key] = value;
		}
	};

	return function(moduleName, id) {
		var source = rsModuleManager(moduleName);

		var model = new RsModel();
		model.attributes.id = id;
		model.save = function() {
			source.save(this.attributes);
		};

		source.get(id).then(function(obj) {
			if (!obj) return null;
			Object.keys(obj).forEach(function(key) {
				model.attributes[key] = obj[key];
			});
		});

		return model;
	};
})

.factory('rsBind', function($timeout, rsModuleManager) {
	return function(moduleName, id, scope, key, defaults) {
		var source = rsModuleManager(moduleName);
		scope[key] = defaults || {};
		scope[key].id = id;

		source.get(id).then(function(obj) {
			$timeout(function() {
				if (!obj) return null;
				Object.keys(obj).forEach(function(prop) {
					scope[key][prop] = obj[prop];
				});
			});
		});

		return function() {
			source.save(scope[key]);
		};
	};
})

.factory('rsCollection', function($timeout, rsModuleManager) {

	function find(array, iterator, scope) {
		var value = null;
		array.some(function(item) {
			if (iterator.call(scope, item)) {
				value = item;
				return true;
			}
		});
		return value;
	}

	function findIndex(array, iterator, scope) {
		var value = -1;
		array.some(function(item, index) {
			if (iterator.call(scope, item)) {
				value = index;
				return true;
			}
		});
		return value;
	}


	return function(moduleName) {
		var collection = [];

		collection.getById = function(id) {
			return find(collection, function(item) {
				return item.id === id;
			});
		};

		collection.getIndexById = function(id) {
			return findIndex(collection, function(item) {
				return item.id === id;
			});
		};

		var source = rsModuleManager(moduleName);

		collection.add = function(data) {
			return source.add(data);
		};

		collection.remove = function(data) {
			return source.remove(data);
		};

		collection.update = function(data) {
			return source.save(data);
		};

		source.on('change', function(event) {
			$timeout(function() {
				var id = event.relativePath;
				var index = collection.getIndexById(id);

				// add
				//if(event.newValue && !event.oldValue)
				if (index === -1)
					return collection.push(event.newValue);

				// remove
				if (!event.newValue)
					return collection.splice(index, 1);

				collection.splice(index, 1, event.newValue);
			});
		});

		source.list();

		remoteStorage.on('features-loaded', function(){
			remoteStorage.on('disconnect', function() {
				collection.length = 0;
			});
		});

		return collection;
	};
});
