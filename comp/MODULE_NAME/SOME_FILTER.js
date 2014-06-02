define(function(require) {
  'use strict';
  var module = require('app-module')

  module.filter('SOME_FILTER', function() {
    return function(value) {
      // ...
    };
  });
});
