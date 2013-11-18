'use strict';

angular.module('orderDisplayApp')
	.controller('MainCtrl', function ($scope, $http) {
		$scope.currOrderNumber = 0;
		var ordersMax = 100;

		$scope.inProgressNumbers = [];
		$scope.pickUpNumbers = [];

		$scope.addNewOrder = function(){
			if($scope.currOrderNumber >= ordersMax){
				$scope.currOrderNumber = 0;
			}
			$scope.currOrderNumber++;
			$scope.inProgressNumbers.push($scope.currOrderNumber);

			
		};

		$scope.moveToPickup = function(index){
			var pickUpOrder = $scope.inProgressNumbers.splice(index, 1)[0];
			$scope.pickUpNumbers.push(pickUpOrder);
			$http.post('/orderReady', {'orderNumber' : pickUpOrder}).success(function(){
				console.log('ready for pickup', pickUpOrder);
			});
		};

		$scope.deleteOrder = function(index){
			var pickedUpOrder = $scope.pickUpNumbers.splice(index, 1)[0];

			$http.post('/removeOrder', {'orderNumber' : pickedUpOrder}).success(function(){
				console.log('removed', pickedUpOrder);
			});
		};


		//dev only
		/*$scope.addNewOrder();
		$scope.addNewOrder();
		$scope.addNewOrder();
		$scope.moveToPickup(1);*/
	});
