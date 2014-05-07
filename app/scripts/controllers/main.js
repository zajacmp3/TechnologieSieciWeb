'use strict';
var currentIndex = 0;

var app = angular.module('tswApp').controller('MainCtrl', ['$scope', 'Pagination', function($scope, Pagination) {
	$scope.pagination = Pagination.getNew();
	$scope.images = [{'name' : 'First Image', 'url' : 'http://i.telegraph.co.uk/multimedia/archive/01887/rabbit_1887903b.jpg'},
	                 {'name' : 'Second Image', 'url' : 'http://designshack.net/wp-content/uploads/mouseinout-5.jpg'},
	                 {'name' : 'Second Image', 'url' : 'http://i.telegraph.co.uk/multimedia/archive/01887/rabbit_1887903b.jpg'},
	                 {'name' : 'Second Image', 'url' : 'http://designshack.net/wp-content/uploads/mouseinout-5.jpg'},
	                ];
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
	$scope.articles = [{'title' : 'News title', 'content' : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'author' : 'admin', 'created' : '05-05-2014 18:50', 'modified' : '05-05-2014 18:50'},
	                   {'image' : {'src' : 'http://designshack.net/wp-content/uploads/mouseinout-5.jpg', 'title' : 'css'},'title' : 'News title', 'content' : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'author' : 'admin', 'created' : '05-05-2014 18:50', 'modified' : '05-05-2014 18:50'},
	                   {'title' : 'News title', 'content' : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'author' : 'admin', 'created' : '05-05-2014 18:50', 'modified' : '05-05-2014 18:50'},
	                   {'image' : {'src' : 'http://designshack.net/wp-content/uploads/mouseinout-5.jpg', 'title' : 'css'},'title' : 'News title', 'content' : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'author' : 'admin', 'created' : '05-05-2014 18:50', 'modified' : '05-05-2014 18:50'},
	                   {'title' : 'News title', 'content' : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'author' : 'admin', 'created' : '05-05-2014 18:50', 'modified' : '05-05-2014 18:50'},
	                   {'image' : {'src' : 'http://designshack.net/wp-content/uploads/mouseinout-5.jpg', 'title' : 'css'},'title' : 'News title', 'content' : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'author' : 'admin', 'created' : '05-05-2014 18:50', 'modified' : '05-05-2014 18:50'},
	                   {'title' : 'News title', 'content' : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'author' : 'admin', 'created' : '05-05-2014 18:50', 'modified' : '05-05-2014 18:50'},
	                   {'image' : {'src' : 'http://designshack.net/wp-content/uploads/mouseinout-5.jpg', 'title' : 'css'},'title' : 'News title', 'content' : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'author' : 'admin', 'created' : '05-05-2014 18:50', 'modified' : '05-05-2014 18:50'},
	                   {'title' : 'News title', 'content' : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'author' : 'admin', 'created' : '05-05-2014 18:50', 'modified' : '05-05-2014 18:50'},
	                   {'image' : {'src' : 'http://designshack.net/wp-content/uploads/mouseinout-5.jpg', 'title' : 'css'},'title' : 'News title', 'content' : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'author' : 'admin', 'created' : '05-05-2014 18:50', 'modified' : '05-05-2014 18:50'},];
	$scope.pagination.numPages = Math.ceil($scope.articles.length/$scope.pagination.perPage);
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
