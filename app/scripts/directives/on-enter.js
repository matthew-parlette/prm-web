'use strict';

/**
 * @ngdoc directive
 * @name prmWebApp.directive:onEnter
 * @description
 * # onEnter
 */
angular.module('prmWebApp')
  .directive('onEnter', function () {
    return function (scope, element, attrs) {
      element.bind("keydown keypress", function (event) {
        if(event.which === 13) {
          scope.$apply(function (){
            scope.$eval(attrs.onEnter);
          });

          event.preventDefault();
        }
      });
    };
  });
