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
        $scope.status_dict[status.id] = status.name;
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
      Job.update(job, function(success){/* success */}, function(error){
        console.log(error);
        $scope.refresh();
      });
    };

    $scope.updateJobStatus = function(job, status){
      job.status_id = status.id;
      console.log(job);
      console.log(status);
      Job.update(job, function(success){/* success */}, function(error){
        console.log(error);
        $scope.refresh();
      });
    };
  });
