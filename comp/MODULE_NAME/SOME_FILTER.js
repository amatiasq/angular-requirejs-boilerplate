define(function(require) {
  'use strict';
  var angular = require('angular');
  require('app-module');
  angular.module('ut-app')

  .filter('SOME_FILTER', function() {
    return function(value) {
      // ...
    };
  });
});
