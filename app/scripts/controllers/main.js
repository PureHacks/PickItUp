'use strict';

angular.module('orderDisplayApp')
	.controller('MainCtrl', function ($scope, $http) {
		$scope.currOrderNumber = 0;
		var ordersMax = 100;

		$scope.inProgressNumbers = [];
		$scope.pickUpNumbers = [];




		$scope.addNewOrder = function(){
			$http.post('/order/create').success(function(data){
				$scope.currOrderNumber = data.orderNumber
				$scope.inProgressNumbers.push($scope.currOrderNumber);
			});
		};

		$scope.moveToPickup = function(index){
			var pickUpOrder = $scope.inProgressNumbers.splice(index, 1)[0];
			///order/:orderNumber/ready
			$scope.pickUpNumbers.push(pickUpOrder);
			$http.post('/order/'+pickUpOrder+'/ready').success(function(){
				console.log('ready for pickup', pickUpOrder);
			});
		};

		$scope.deleteOrder = function(index){
			var pickedUpOrder = $scope.pickUpNumbers.splice(index, 1)[0];
			//exports.serve
			$http.post('/order/'+pickedUpOrder+'/picked-up').success(function(){
				console.log('removed', pickedUpOrder);
			});
		};

		$scope.getAllOrders = function(){
			$http.get('/order/all').success(function(data){
				$scope.pickUpNumbers = data.ordersCompleted.map(function(o){
					return o.orderNumber;
				});
				$scope.inProgressNumbers = data.ordersInProgress.map(function(o){
					return o.orderNumber;
				});				
			});
		};

		$scope.getAllOrders();

	});
