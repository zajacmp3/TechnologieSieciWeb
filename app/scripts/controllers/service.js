'use strict';

angular.module('tswApp').controller('ServiceCtrl', ['$scope', '$http', function($scope, $http) {
	$http.get("/server/serviceSelect").success(function(data){
		$scope.services = data.rows;
	});
}]);

angular.module('tswApp').controller('ReservationCtrl', ['$scope', '$http', 'socket', function($scope, $routeParams, $http, socket) {
	$scope.id = $routeParams.id;
	$http.get("/server/serviceSelect").success(function(data){
		$scope.services = data.rows;
	});
	$scope.seats = [{'id' : '1', 'seats' : [
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
	$scope.change = function(rowId, seatId) {
		$scope.seats[rowId-1].seats[seatId-1].is_reserved = true;
	};
}]);