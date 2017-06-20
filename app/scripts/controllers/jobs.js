'use strict';

/**
 * @ngdoc function
 * @name prmWebApp.controller:JobsCtrl
 * @description
 * # JobsCtrl
 * Controller of the prmWebApp
 */
angular.module('prmWebApp')
  .controller('JobsCtrl', function ($scope, Job) {
    console.log('in jobs controller');
    Job.query(function(data) {
      $scope.jobs = data;
      console.log($scope.jobs);
    });

    $scope.newjob = new Job();

    $scope.addJob = function(){
      $scope.newjob.status_id = 1;
      console.log($scope.newjob);
      $scope.newjob.$save(function() {
        //job created
        console.log($scope.newjob.name + " created!");
        $scope.newjob.name = 'Add a Job';
        $scope.newjob = new Job();
      });
    }
  });
