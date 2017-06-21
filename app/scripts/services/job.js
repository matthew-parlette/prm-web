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
    return $resource("http://localhost:3000/jobs/:id");
  });
