'use strict';

/**
 * @ngdoc function
 * @name prmWebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the prmWebApp
 */
angular.module('prmWebApp')
  .controller('MainCtrl', function () {
    console.log('in main controller');
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
