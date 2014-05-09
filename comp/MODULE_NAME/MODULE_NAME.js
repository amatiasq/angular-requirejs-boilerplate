define(function(require) {
  'use strict';
  require('app-module');
  require('./SOME_DIRECTIVE');

  var angular = require('angular');
  angular.module('APP_NAME')

  .controller('MODULE_NAMECtrl', function($scope) {
    // ...
  });
});
