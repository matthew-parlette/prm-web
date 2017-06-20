'use strict';

/**
 * @ngdoc function
 * @name prmWebApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the prmWebApp
 */
angular.module('prmWebApp')
  .controller('AboutCtrl', function () {
    console.log('in about controller');
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
