define(function(require) {
  'use strict';
  require('app-module');
  var angular = require('angular');
  angular.module('APP_NAME')

  .directive('SOME_DIRECTIVE', function() {
    return {
      restrict: 'E',
      scope: {
        model: '=ngModel',
        text: '@message',
        onSomething: '&',
        //onSomething: '&onSomething',
      },

      compile: function(elem, attr) {
        // ...

        return function postLink(scope) {
          // ...
        };
      },
    };
  });
});
