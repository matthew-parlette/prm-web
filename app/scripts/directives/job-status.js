'use strict';

/**
 * @ngdoc directive
 * @name prmWebApp.directive:jobStatus
 * @description
 * # jobStatus
 */
angular.module('prmWebApp')
  .directive('jobStatus', function () {
    return {
      templateUrl: "views/job_status.html",
      restrict: 'E',
      link: function (scope, element, attrs) {
        angular.element(document).ready(function () {
          $('[data-toggle="tooltip"]').tooltip({
            container: 'body',
            delay: { "show": 500, "hide": 0 }
          });
        });
      }
    };
  });
