'use strict';

describe('Controller: TimeanddateCtrl', function () {

	// load the controller's module
	beforeEach(module('orderDisplayApp'));

	var TimeanddateCtrl,
		scope;

	// Initialize the controller and a mock scope
	beforeEach(inject(function ($controller, $rootScope) {
		scope = $rootScope.$new();
		TimeanddateCtrl = $controller('TimeanddateCtrl', {
			$scope: scope
		});
	}));

	//TODO: Add unit tests

	/*it('should attach a list of awesomeThings to the scope', function () {
		expect(scope.timeNow).toBe(3);
	});*/
});
