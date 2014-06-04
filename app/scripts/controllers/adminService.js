'use strict';

var app = angular.module('tswAppAdmin').controller('AdminServiceCtrl', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
	var id = $routeParams.id;
	
	//Getting news
	var condition = "";
	if(id !== null) {
		condition = "?id="+id;
	}
	$http.get("/server/serviceSelect" + condition).success(function(data){
		//Edit purposes
		if(id !== null) {
			$scope.service = data.rows[0];
			return;
		}
		//View all purposes
		$scope.services = data.rows;
	});
}]);
