'use strict';

/* Controllers */

var homeControllers = angular.module('homeControllers', []);

homeControllers.controller('homeCtrl', ['$scope', '$http',
    function($scope, $http) {
        $scope.test = 'This is a test';
}]);