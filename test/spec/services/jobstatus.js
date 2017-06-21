'use strict';

describe('Service: JobStatus', function () {

  // load the service's module
  beforeEach(module('prmWebApp'));

  // instantiate service
  var JobStatus;
  beforeEach(inject(function (_JobStatus_) {
    JobStatus = _JobStatus_;
  }));

  it('should do something', function () {
    expect(!!JobStatus).toBe(true);
  });

});
