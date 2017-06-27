'use strict';

/**
 * @ngdoc function
 * @name prmWebApp.controller:JobsCtrl
 * @description
 * # JobsCtrl
 * Controller of the prmWebApp
 */
angular.module('prmWebApp')
  .controller('JobsCtrl', function ($scope, Job, JobStatus, $q) {
    $scope.jobs = Job.query(function(data){$scope.jobs = data;});

    $scope.refresh = function(){
      $scope.setFocusTask();
    }

    $scope.statuses = JobStatus.query(function(data){
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
      job.weight = parseInt(job.weight);
      job.effort = parseInt(job.effort);
      Job.update(job, function(success){$scope.refresh();}, function(error){
        console.log(error);
        $scope.refresh();
      });
    };

    $scope.updateJobName = function(job, name){
      Job.update(job, function(success){$scope.refresh();}, function(error){
        console.log(error);
        $scope.refresh();
      });
    };

    $scope.updateJobStatus = function(job, status){
      job.status_id = status.id;
      Job.update(job, function(success){$scope.refresh();}, function(error){
        console.log(error);
        $scope.refresh();
      });
    };

    $scope.weights = [0, 1, 2, 3];
    $scope.efforts = {};
    $scope.efforts[0] = "Trivial";
    $scope.efforts[1] = "Easy";
    $scope.efforts[2] = "Normal";
    $scope.efforts[3] = "Epic";

    $scope.getJobStatus = function(name, callback){
      $scope.statuses.$promise.then(function(statuses){
        statuses.forEach(function(status){
          if(status.name.toLowerCase() == name.toLowerCase()){
            callback(status);
          }
        });
      });
    }

    $scope.getJobsInStatus = function(name, callback){
      $scope.jobs.$promise.then(function(jobs){
        $scope.getJobStatus(name, function(status){
          var jobs = [];
          $scope.jobs.forEach(function(job){
            if(job.status_id == status.id){
              jobs.push(job);
            }
          });
          callback(jobs);
        });
      });
    };

    $scope.getTopTaskFrom = function(jobs, callback){
      var result = null;
      jobs.forEach(function(job){
        if(result == null){
          result = job;
        }else{
          if(false){
            // Check date
          }else{
            if(typeof job.weight === 'number' && typeof result.weight === 'number' && job.weight > result.weight){
              result = job;
            }else{
              if(typeof job.effort === 'number' && typeof result.effort === 'number' && job.effort < result.effort){
                result = job;
              }else{
                // Compare contact or organization attributes
              }
            }
          }
        }
      });
      callback(result);
    };

    $scope.setFocusTask = function(){
      // Set the current task to focus on
      // This should only come from the working status
      // If no task is in working, then find the next task to move to working
      $scope.getJobsInStatus("working", function(jobs){
        $scope.getTopTaskFrom(jobs, function(job){
          $scope.focus = job;
          if($scope.focus == null){
            $scope.getJobsInStatus("backlog", function(jobs){
              $scope.getTopTaskFrom(jobs, function(job){
                $scope.focus = job;
                if($scope.focus == null){
                  $scope.getJobsInStatus("waiting", function(jobs){
                    $scope.getTopTaskFrom(jobs, function(job){
                      $scope.focus = job;
                      if($scope.focus == null){
                        $scope.getJobsInStatus("delegated", function(jobs){
                          $scope.getTopTaskFrom(jobs, function(job){
                            $scope.focus = job;
                          });
                        });
                      }
                    });
                  });
                }
              });
            });
          }
        });
      });
    };

    $scope.refresh();
  });
