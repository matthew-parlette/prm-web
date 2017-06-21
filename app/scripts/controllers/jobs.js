'use strict';

/**
 * @ngdoc function
 * @name prmWebApp.controller:JobsCtrl
 * @description
 * # JobsCtrl
 * Controller of the prmWebApp
 */
angular.module('prmWebApp')
  .controller('JobsCtrl', function ($scope, Job, JobStatus) {
    $scope.refresh = function(){
      Job.query(function(data) {
        $scope.jobs = data;
      });
    }

    JobStatus.query(function(data){
      $scope.statuses = {};
      data.forEach(function(status){
        $scope.statuses[status.id] = status.name;
      });
    })

    $scope.newjob = new Job();

    $scope.addJob = function(){
      $scope.newjob.status_id = 1;
      $scope.newjob.$save(function() {
        //job created
        $scope.newjob.name = 'Add a Job';
        $scope.newjob = new Job();
        $scope.refresh();
      });
    };

    $scope.updateJobName = function(job, name){
      console.log(job);
      Job.update(job, function(success){/* success */}, function(error){
        console.log(error);
        $scope.refresh();
      });
    };
  });
