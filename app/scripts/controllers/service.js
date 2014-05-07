'use strict';

angular.module('tswApp').controller('ServiceCtrl', function($scope) {
	$scope.services = [{'id' : '1', 'name' : 'Msza św.', 'dayName' : 'Niedziela', 'hour' : '11:00'},
	                   {'id' : '2', 'name' : 'Msza św.', 'dayName' : 'Niedziela', 'hour' : '12:00'},
	                   {'id' : '3', 'name' : 'Msza św.', 'dayName' : 'Niedziela', 'hour' : '16:00'},
	                   {'id' : '4', 'name' : 'Msza św.', 'dayName' : 'Niedziela', 'hour' : '18:00'},
	                   {'id' : '5', 'name' : 'Msza św.', 'dayName' : 'Niedziela', 'hour' : '19:00'},
	                   {'id' : '6', 'name' : 'Msza św.', 'dayName' : 'Niedziela', 'hour' : '21:00'},
	                   {'id' : '7', 'name' : 'Msza św.', 'dayName' : 'Poniedziałek-Sobota', 'hour' : '06:00'},
	                   {'id' : '8', 'name' : 'Msza św.', 'dayName' : 'Poniedziałek-Sobota', 'hour' : '11:00'},
	                   {'id' : '9', 'name' : 'Msza św.', 'dayName' : 'Poniedziałek-Sobota', 'hour' : '18:00'},
	                  ];
});

angular.module('tswApp').controller('ReservationCtrl', function($scope, $routeParams) {
	$scope.id = $routeParams.id;
	$scope.services = [{'id' : '1', 'name' : 'Msza św.', 'dayName' : 'Niedziela', 'hour' : '11:00'},
	                   {'id' : '2', 'name' : 'Msza św.', 'dayName' : 'Niedziela', 'hour' : '12:00'},
	                   {'id' : '3', 'name' : 'Msza św.', 'dayName' : 'Niedziela', 'hour' : '16:00'},
	                   {'id' : '4', 'name' : 'Msza św.', 'dayName' : 'Niedziela', 'hour' : '18:00'},
	                   {'id' : '5', 'name' : 'Msza św.', 'dayName' : 'Niedziela', 'hour' : '19:00'},
	                   {'id' : '6', 'name' : 'Msza św.', 'dayName' : 'Niedziela', 'hour' : '21:00'},
	                   {'id' : '7', 'name' : 'Msza św.', 'dayName' : 'Poniedziałek-Sobota', 'hour' : '06:00'},
	                   {'id' : '8', 'name' : 'Msza św.', 'dayName' : 'Poniedziałek-Sobota', 'hour' : '11:00'},
	                   {'id' : '9', 'name' : 'Msza św.', 'dayName' : 'Poniedziałek-Sobota', 'hour' : '18:00'},
	                  ];
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
});