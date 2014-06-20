define(function(require) {
  'use strict';
  var angular = require('angular');

  var deps = [
    'ngRoute',
  ];

  if (!DEBUG) {
    deps.push('app-templates');
  }

  return angular.module('pollas', deps);
});
