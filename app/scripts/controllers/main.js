'use strict';
var currentIndex = 0;

var app = angular.module('tswApp').controller('MainCtrl', ['$scope', 'Pagination', '$http', function($scope, Pagination, $http) {
	$scope.pagination = Pagination.getNew();
	$scope.images = [{'name' : 'First Image', 'url' : 'http://i.telegraph.co.uk/multimedia/archive/01887/rabbit_1887903b.jpg'},
	                 {'name' : 'Second Image', 'url' : 'http://designshack.net/wp-content/uploads/mouseinout-5.jpg'},
	                 {'name' : 'Second Image', 'url' : 'http://i.telegraph.co.uk/multimedia/archive/01887/rabbit_1887903b.jpg'},
	                 {'name' : 'Second Image', 'url' : 'http://designshack.net/wp-content/uploads/mouseinout-5.jpg'},
	                ];
	
	$http.get("/server/serviceSelect").success(function(data){
		$scope.services = data.rows;
	});
	$http.get("/server/newsSelect").success(function(data){
		$scope.articles = data.rows;
		$scope.pagination.numPages = Math.ceil($scope.articles.length/$scope.pagination.perPage);
	});
}]);

app.directive('slideShow', function() {
	return {
		restrict : 'AE',
		replace : 'true',
		templateUrl : '/views/elements/slideshow.html',
		link: function(scope, elem, attrs) {
			scope.next = function() {
			  currentIndex < scope.images.length - 1 ? currentIndex++ : currentIndex = 0;
			};
			scope.prev = function() {
			  currentIndex > 0 ? currentIndex-- : currentIndex = scope.images.length - 1;
			};
			scope.$watch('currentIndex', function() {
			  scope.images.forEach(function(image) {
			    image.visible = false; // make every image invisible
			  });
			  scope.images[currentIndex].visible = true; // make the current image visible
			});
		}
	};
});
