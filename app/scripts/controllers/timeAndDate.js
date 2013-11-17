'use strict';

angular.module('orderDisplayApp')
	.controller('TimeanddateCtrl', function ($scope, $timeout) {
		

		$scope.days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		$scope.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

		$scope.timeNow = "";
		$scope.dateNow = "";
		$scope.setTimeAndDate = function(){
			var d = new Date();
			var h = d.getHours();
			var min = d.getMinutes();
			var ampm = h >= 12 ? 'pm' : 'am';
			h = h % 12;
			h = h ? h : 12; // the hour '0' should be '12'
			min = min < 10 ? '0' + min : min;
			h = h < 10 ? '0' + h : h;
			$scope.timeNow  = h + ':' + min + ' ' + ampm;

			$scope.dateNow = $scope.days[d.getDay()] + ", " + $scope.months[d.getMonth()]  + " " + d.getDate();
			$timeout($scope.setTimeAndDate, 1000);
		};

		$scope.setTimeAndDate();
	});

