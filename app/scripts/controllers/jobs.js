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
        console.log($scope.jobs);
      });
    }

    JobStatus.query(function(data){
      $scope.statuses = data;
      // Set glyphicons
      $scope.statuses.forEach(function(status){
        switch(status.name.toLowerCase()) {
          case "backlog":
            status.icon = "list-alt";
            break;
          case "working":
            status.icon = "open";
            break;
          case "waiting":
            status.icon = "calendar";
            break;
          case "delegated":
            status.icon = "send";
            break;
          case "done":
            status.icon = "ok";
            break;
          default:
            status.icon = "question-sign";
        }
      });

      // Still need status_dict for job_status view
      $scope.status_dict = {};
      data.forEach(function(status){
        $scope.status_dict[status.id] = status;
      });
    })

    $scope.friendlyJobStatus = function(id){
      $scope.statuses.forEach(function(status){
        if(id == status.id){
          console.log("returning " + status.name);
          return status.name;
        }
      });
    };

    $scope.job = new Job();
    $scope.job.status_id = 1;

    $scope.addJob = function(){
      $scope.job.status_id = 1;
      $scope.job.$save(function() {
        //job created
        $scope.job.name = 'Add a Job';
        $scope.job = new Job();
        $scope.job.status_id = 1;
        $scope.refresh();
      });
    };

    $scope.updateJob = function(job){
      Job.update(job, function(success){/* success */}, function(error){
        console.log(error);
        $scope.refresh();
      });
    };

    $scope.updateJobName = function(job, name){
      Job.update(job, function(success){/* success */}, function(error){
        console.log(error);
        $scope.refresh();
      });
    };

    $scope.updateJobStatus = function(job, status){
      job.status_id = status.id;
      Job.update(job, function(success){/* success */}, function(error){
        console.log(error);
        $scope.refresh();
      });
    };

    $scope.weights = [0, 1, 2, 3];

    $scope.refresh();
  });
