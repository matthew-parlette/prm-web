'use strict';

/**
 * @ngdoc overview
 * @name prmWebApp
 * @description
 * # prmWebApp
 *
 * Main module of the application.
 */
angular
  .module('prmWebApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    "xeditable"
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/jobs', {
        templateUrl: 'views/jobs.html',
        controller: 'JobsCtrl',
        controllerAs: 'jobs'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function(editableOptions) {
    editableOptions.theme = 'bs3';
  });
