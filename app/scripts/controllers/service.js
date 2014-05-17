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
	                                        {'id' : '1', 'is_reserved' : false, 'status' : 0},
	                                        {'id' : '2', 'is_reserved' : false, 'status' : 0},
	                                        {'id' : '3', 'is_reserved' : false, 'status' : 0},
	                                        {'id' : '4', 'is_reserved' : false, 'status' : 0},
	                                        {'id' : '5', 'is_reserved' : false, 'status' : 0},
	                                        {'id' : '6', 'is_reserved' : false, 'status' : 0},
	                                        ]}, 
                    {'id' : '2', 'seats' : [
	                                        {'id' : '1', 'is_reserved' : false, 'status' : 0},
	                                        {'id' : '2', 'is_reserved' : false, 'status' : 0},
	                                        {'id' : '3', 'is_reserved' : false, 'status' : 0},
	                                        {'id' : '4', 'is_reserved' : false, 'status' : 0},
	                                        {'id' : '5', 'is_reserved' : false, 'status' : 0},
	                                        {'id' : '6', 'is_reserved' : false, 'status' : 0},
	                                        ]},
                    {'id' : '3', 'seats' : [
	                                        {'id' : '1', 'is_reserved' : false, 'status' : 0},
	                                        {'id' : '2', 'is_reserved' : false, 'status' : 0},
	                                        {'id' : '3', 'is_reserved' : false, 'status' : 0},
	                                        {'id' : '4', 'is_reserved' : false, 'status' : 0},
	                                        {'id' : '5', 'is_reserved' : false, 'status' : 0},
	                                        {'id' : '6', 'is_reserved' : false, 'status' : 0},
	                                        ]},
                    {'id' : '4', 'seats' : [
	                                        {'id' : '1', 'is_reserved' : false, 'status' : 0},
	                                        {'id' : '2', 'is_reserved' : false, 'status' : 0},
	                                        {'id' : '3', 'is_reserved' : false, 'status' : 0},
	                                        {'id' : '4', 'is_reserved' : false, 'status' : 0},
	                                        {'id' : '5', 'is_reserved' : false, 'status' : 0},
	                                        {'id' : '6', 'is_reserved' : false, 'status' : 0},
	                                        ]},
                    {'id' : '5', 'seats' : [
	                                        {'id' : '1', 'is_reserved' : false, 'status' : 0},
	                                        {'id' : '2', 'is_reserved' : false, 'status' : 0},
	                                        {'id' : '3', 'is_reserved' : false, 'status' : 0},
	                                        {'id' : '4', 'is_reserved' : false, 'status' : 0},
	                                        {'id' : '5', 'is_reserved' : false, 'status' : 0},
	                                        {'id' : '6', 'is_reserved' : false, 'status' : 0},
	                                        ]},
                    {'id' : '6', 'seats' : [
	                                        {'id' : '1', 'is_reserved' : false, 'status' : 0},
	                                        {'id' : '2', 'is_reserved' : false, 'status' : 0},
	                                        {'id' : '3', 'is_reserved' : false, 'status' : 0},
	                                        {'id' : '4', 'is_reserved' : false, 'status' : 0},
	                                        {'id' : '5', 'is_reserved' : false, 'status' : 0},
	                                        {'id' : '6', 'is_reserved' : false, 'status' : 0},
	                                        {'id' : '7', 'is_reserved' : false, 'status' : 0},
	                                        {'id' : '8', 'is_reserved' : false, 'status' : 0},
	                                        {'id' : '9', 'is_reserved' : false, 'status' : 0},
	                                        {'id' : '10', 'is_reserved' : false, 'status' : 0},
	                                        ]},
					];
	$scope.seats = $scope.defaultSeats;
	
	$scope.prereservedSeats = [];
	$scope.addToPrereserved = function(rowId, seatId) {
		$scope.prereservedSeats.push({serviceId: $scope.id, rowId: rowId, seatId: seatId, name: ''});
	};
	$scope.removeFromPreserved = function(rowId, seatId) {
		for(var i = 0; i<$scope.prereservedSeats.length; i++) {
			if($scope.prereservedSeats[i].rowId == rowId && $scope.prereservedSeats[i].seatId == seatId) {
				$scope.prereservedSeats.splice(i, 1);
			}
		}
	};
	
	var condition = 'service_id='+$scope.id;
	$http.get("/server/reservationSelect?"+condition).success(function(data){
		$scope.reserved = data.rows;
		$scope.updateReservation($scope.reserved);
	});
	
	$scope.change = function(rowId, seatId, is_reserverd) {
		socket.emit(
			'prereserve',
			{
				rowId : rowId,
				seatId : seatId,
				serviceId : $scope.id,
				is_prereserved : is_reserverd
			},
			function(result) {
				if (!result) {
					alert('There was an error making prereservation');
				}
			});
		if(is_reserverd) {
			$scope.addToPrereserved(rowId, seatId);
		} else {
			$scope.removeFromPreserved(rowId, seatId);
		}
	};
	$scope.reserve = function() {
		socket.emit('reserve', $scope.prereservedSeats, function(result) {
			if (!result) {
				alert('There was an error making reservation');
				return;
			}
		});
		$scope.prereservedSeats = [];
	};
	socket.on('reservationChange', function (data) {
		console.log("CHANGE!");
		$http.get("/server/reservationSelect?"+condition).success(function(data){
			$scope.reserved = data.rows;
			$scope.updateReservation($scope.reserved);
		});
	});
	
	$scope.resetSeats = function(){
		for(var i = 0; i<$scope.defaultSeats.length; i++) {
			for(var j = 0; j<$scope.defaultSeats[i].length; i++) {
				$scope.seats[i].seats[j].status = 0;
				$scope.seats[i].seats[j].is_reserved = false;				
			}
		}
	}
	
	$scope.updateReservation = function(reserved) {
		$scope.seats = $scope.defaultSeats;
		$scope.resetSeats();
		//TODO: replace above with 'reset' that iterates on all records. slow but without errors and much effort
		for(var record in reserved) {
			$scope.seats[reserved[record].row -1].seats[reserved[record].seat -1].status = reserved[record].status;
			if(reserved[record].status == 2) {
				$scope.seats[reserved[record].row -1].seats[reserved[record].seat -1].is_reserved = true;
			}
		};
	};
}]);