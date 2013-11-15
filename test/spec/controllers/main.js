'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('orderDisplayApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should be able to add new Orders to inProgressNumbers', function () {
    expect(scope.inProgressNumbers.length).toBe(0);
    scope.addNewOrder();
    scope.addNewOrder();
    expect(scope.inProgressNumbers.length).toBe(2);

  });

  it('should be able to move Orders to "ready for Pickup"', function () {
    scope.addNewOrder();
    scope.addNewOrder();
    scope.moveToPickup(1);
    scope.moveToPickup(0);
    expect(scope.pickUpNumbers[0]).toBe(2);
    expect(scope.pickUpNumbers[1]).toBe(1);
  });
  
  it('should be able to remove picked up orders', function () {
    scope.addNewOrder();
    scope.moveToPickup(0);
    expect(scope.pickUpNumbers.length).toBe(1);
    scope.deleteOrder(0);
    expect(scope.pickUpNumbers.length).toBe(0);
  });
});
