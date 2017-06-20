'use strict';

/**
 * @ngdoc service
 * @name prmWebApp.Job
 * @description
 * # Job
 * Factory in the prmWebApp.
 */
angular.module('prmWebApp')
  .factory('Job', function ($resource) {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    // return {
    //   someMethod: function () {
    //     return meaningOfLife;
    //   }
    // };
    return $resource("http://localhost:3000/jobs/:id");
  });
