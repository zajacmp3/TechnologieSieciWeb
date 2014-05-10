'use strict';

angular.module('tswApp').controller('ServiceCtrl', ['$scope', '$http', function($scope, $http) {
	$http.get("/server/serviceSelect").success(function(data){
		$scope.services = data.rows;
	});
}]);

angular.module('tswApp').controller('ReservationCtrl', ['$scope', '$routeParams', '$http', 'socket', function($scope, $routeParams, $http, socket) {
	$scope.id = $routeParams.id;
	$http.get("/server/serviceSelect").success(function(data){
		$scope.services = data.rows;
	});
	$scope.defaultSeats = [{'id' : '1', 'seats' : [
	                                        {'id' : '1', 'is_reserved' : false},
	                                        {'id' : '2', 'is_reserved' : false},
	                                        {'id' : '3', 'is_reserved' : false},
	                                        {'id' : '4', 'is_reserved' : false},
	                                        {'id' : '5', 'is_reserved' : false},
	                                        {'id' : '6', 'is_reserved' : false},
	                                        ]}, 
                    {'id' : '2', 'seats' : [
	                                        {'id' : '1', 'is_reserved' : false},
	                                        {'id' : '2', 'is_reserved' : false},
	                                        {'id' : '3', 'is_reserved' : false},
	                                        {'id' : '4', 'is_reserved' : false},
	                                        {'id' : '5', 'is_reserved' : false},
	                                        {'id' : '6', 'is_reserved' : false},
	                                        ]},
                    {'id' : '3', 'seats' : [
	                                        {'id' : '1', 'is_reserved' : false},
	                                        {'id' : '2', 'is_reserved' : false},
	                                        {'id' : '3', 'is_reserved' : false},
	                                        {'id' : '4', 'is_reserved' : false},
	                                        {'id' : '5', 'is_reserved' : false},
	                                        {'id' : '6', 'is_reserved' : false},
	                                        ]},
					];
	$scope.seats = $scope.defaultSeats;
	
	var condition = 'service_id='+$scope.id;
	$http.get("/server/reservationSelect?"+condition).success(function(data){
		$scope.reserved = data.rows;
		$scope.updateReservation();
	});
	
	$scope.change = function(rowId, seatId,is_reserverd) {
		socket.emit(
			'reserve',
			{
				rowId : rowId,
				seatId : seatId,
				serviceId : $scope.id,
				is_reserved : is_reserverd
			},
			function(result) {
				if (!result) {
					alert('There was an error making reservation');
				}
			});
	};
	socket.on('reservationChange', function (data) {
		$http.get("/server/reservationSelect?"+condition).success(function(data){
			$scope.reserved = data.rows;
			$scope.updateReservation();
		});
	});
	
	$scope.updateReservation = function() {
		$scope.seats = $scope.defaultSeats;
		for(var record in $scope.reserved) {
			$scope.seats[$scope.reserved[record].row -1].seats[$scope.reserved[record].seat -1].is_reserved = true;
		};
	};
}]);