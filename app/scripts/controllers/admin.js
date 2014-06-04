'use strict';

var app = angular.module('tswAppAdmin').controller('AdminCtrl', ['$scope', '$http', 'Pagination', '$location', '$routeParams', function($scope, $http, Pagination, $location, $routeParams) {
	var id = $routeParams.id;
	$scope.pagination = Pagination.getNew();
	
	//Getting news
	var condition = "";
	if($scope.search !== null) {
		condition = "?title="+$scope.search;
	}
	if(id !== null) {
		condition = "?id="+id;
	}
	$http.get("/server/newsSelect" + condition).success(function(data){
		//Edit purposes
		if(id !== null) {
			$scope.article = data.rows[0];
			return;
		}
		//View all purposes
		$scope.articles = data.rows;
		$scope.pagination.numPages = Math.ceil($scope.articles.length/$scope.pagination.perPage);
	});
	
	//Search
	$scope.search = null;
	$scope.submit = function() {
		if ($scope.search) {
			$location.path('/search/'+$scope.search);
		}
	};
}]);
