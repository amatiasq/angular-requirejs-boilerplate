define(function(require) {
  'use strict';
  require('app-module');
  require('comp/MODULE_NAME/MODULE_NAME');

  var SOME_TOOL = require('tools/SOME_TOOL');
  var angular = require('angular');
  angular.module('APP_NAME')

  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'comp/MODULE_NAME/MODULE_NAME.html',
        controller: 'MODULE_NAMECtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

  angular.bootstrap(document, [ 'APP_NAME' ]);
});
