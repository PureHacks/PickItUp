'use strict';

describe('Controller: HomescreenCtrl', function () {

  // load the controller's module
  beforeEach(module('orderDisplayApp'));

  var HomescreenCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HomescreenCtrl = $controller('HomescreenCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
