'use strict';

/**
 * @ngdoc service
 * @name prmWebApp.JobStatus
 * @description
 * # JobStatus
 * Factory in the prmWebApp.
 */
angular.module('prmWebApp')
  .factory('JobStatus', function ($resource, $http) {
    return $resource("http://localhost:3000/job_statuses/:id");
  });
