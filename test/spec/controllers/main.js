'use strict';

describe('Controller: MainCtrl', function () {

	// load the controller's module
	beforeEach(module('orderDisplayApp'));

	var MainCtrl,
		$httpBackend,
		scope;

	// Initialize the controller and a mock scope
	beforeEach(inject(function ($injector) {
		$httpBackend = $injector.get('$httpBackend');
		scope = $injector.get('$rootScope');//$rootScope.$new();
		var $controller = $injector.get('$controller');

		$httpBackend = $injector.get('$httpBackend');
		$httpBackend.when('GET', '/order/all').respond({ orderNumber: 0 , type : 'added' });
		$httpBackend.when('POST', '/order/create').respond({ orderNumber: 0 , type : 'added' });
		$httpBackend.when('POST', '/order/:orderNumber/ready').respond({ orderNumber: 0 , type : 'added' });
		$httpBackend.when('POST', '/order/:orderNumber/picked-up').respond({ orderNumber: 0 , type : 'removed' });
		app.get('/', routes.index);

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
		$httpBackend.expectPOST('/orderReady', { orderNumber: 2 });
		scope.moveToPickup(1);		
		$httpBackend.flush();
		$httpBackend.expectPOST('/orderReady', { orderNumber: 1 });
		scope.moveToPickup(0);
		$httpBackend.flush();
		expect(scope.pickUpNumbers[0]).toBe(2);
		expect(scope.pickUpNumbers[1]).toBe(1);
	});
		
	
	it('should be able to remove picked up orders', function () {
		scope.addNewOrder();
		scope.moveToPickup(0);
		expect(scope.pickUpNumbers.length).toBe(1);
		$httpBackend.expectPOST('/removeOrder', { orderNumber: 1 });
		scope.deleteOrder(0);
		$httpBackend.flush();
		expect(scope.pickUpNumbers.length).toBe(0);		
	});
});
