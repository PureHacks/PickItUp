'use strict';

angular.module('orderDisplayApp')
  .controller('MainCtrl', function ($scope) {
    $scope.orderCount = 0;
    var ordersMax = 100;

    $scope.inProgressNumbers = [];
    $scope.pickUpNumbers = [];

    $scope.addNewOrder = function(){
      if($scope.orderCount >= ordersMax){
        $scope.orderCount = 0;
      }
      $scope.orderCount = ($scope.orderCount + 1);
      $scope.inProgressNumbers.push($scope.orderCount);
    };

    $scope.moveToPickup = function(index){
      $scope.pickUpNumbers.push($scope.inProgressNumbers.splice(index, 1)[0]);
    };

    $scope.deleteOrder = function(index){
      $scope.pickUpNumbers.splice(index, 1);
    };
  });
