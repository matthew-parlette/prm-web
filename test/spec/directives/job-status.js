'use strict';

describe('Directive: jobStatus', function () {

  // load the directive's module
  beforeEach(module('prmWebApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<job-status></job-status>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the jobStatus directive');
  }));
});
