'use strict';

describe('Directive: resize', function () {

	// load the directive's module
	beforeEach(module('orderDisplayApp'));

	var element,
		scope;

	beforeEach(inject(function ($rootScope) {
		scope = $rootScope.$new();
	}));

	//TODO: Add unit tests
	
	/*it('should change height', inject(function ($compile, $window) {
		element = angular.element('<resize></resize>');
		element = $compile(element)(scope);

		expect(scope.screenHeight).toBe($window.outerHeight);
	}));*/
});
