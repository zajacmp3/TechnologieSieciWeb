'use strict';
var currentIndex = 0;

var app = angular.module('tswApp').controller('MainCtrl', ['$scope', 'Pagination', '$http', '$location', '$routeParams', function($scope, Pagination, $http, $location, $routeParams) {
	$scope.pagination = Pagination.getNew();
	$scope.images = [{'name' : 'First Image', 'url' : 'http://i.telegraph.co.uk/multimedia/archive/01887/rabbit_1887903b.jpg'},
	                 {'name' : 'Second Image', 'url' : 'http://designshack.net/wp-content/uploads/mouseinout-5.jpg'},
	                 {'name' : 'Second Image', 'url' : 'http://i.telegraph.co.uk/multimedia/archive/01887/rabbit_1887903b.jpg'},
	                 {'name' : 'Second Image', 'url' : 'http://designshack.net/wp-content/uploads/mouseinout-5.jpg'},
	                ];
	
	$http.get("/server/serviceSelect").success(function(data){
		$scope.services = data.rows;
	});
	$scope.articles = [];
	console.log($routeParams);
	$http.get("/server/newsSelect").success(function(data){
		$scope.articles = data.rows;
		$scope.pagination.numPages = Math.ceil($scope.articles.length/$scope.pagination.perPage);
	});
	
	//This is not the proper place for functions like it. Should be in slideShow component.
	$scope.slideShowNext = function(){
		$('.cycle-slideshow').cycle('next');
	};
	$scope.slideShowPrev = function(){
		$('.cycle-slideshow').cycle('prev');
	};
	
	$scope.search = null;
	$scope.submit = function() {
		if ($scope.search) {
			$location.path('/search/'+$scope.search);
		}
	};
}]);

app.directive('slideShow', function($timeout) {
	return {
		restrict : 'AE',
		replace : 'true',
		templateUrl : '/views/elements/slideshow.html',
		link: function(scope, elem, attrs) {
			//timeout here is just horrible. It is just a huge sign how not mature angular really is
			//https://github.com/angular/angular.js/issues/1306
			$timeout(function(){
				$('.cycle-slideshow').cycle();
		    },0);
		}
	};
});