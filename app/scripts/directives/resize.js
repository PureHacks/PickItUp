'use strict';

angular.module('orderDisplayApp')
  .directive('resize', function ($window) {
    return function ($scope, element) {

        var w = angular.element($window);

        $scope.screenHeight = $window.outerHeight;

        w.bind('resize', function () {
        	$scope.screenHeight = $window.outerHeight;
            $scope.$apply();
        });
    }
});
