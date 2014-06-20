define(function(require) {
  'use strict';
  var SOME_TOOL = require('tools/SOME_TOOL');
  require('comp/MODULE_NAME/MODULE_NAME');
  var module = require('app-module')

  module.config(function($routeProvider) {
    $routeProvider
      .when('/MODULE_NAME', {
        templateUrl: 'comp/MODULE_NAME/MODULE_NAME.html',
        controller: 'MODULE_NAMECtrl',
        controllerAs: 'MODULE_NAME',
      })
      .otherwise({
        redirectTo: '/MODULE_NAME'
      });
  });

  angular.bootstrap(document, [ 'APP_NAME' ]);
});
