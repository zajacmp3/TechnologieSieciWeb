'use strict';

angular
  .module('tswApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ngAnimate',
    'simplePagination',
    'btford.socket-io',
  ])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/search/:string', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/page/:number', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/service', {
          templateUrl: 'views/service/service.html',
          controller: 'ServiceCtrl'
      })
      .when('/service/:id', {
          templateUrl: '/views/service/reservation.html',
          controller: 'ReservationCtrl'
      })
      .when('/patron', {
          templateUrl: 'views/static/patron.html',
          controller: 'StaticCtrl'
      })
      .when('/sakramenty', {
          templateUrl: 'views/static/patron.html',
          controller: 'StaticCtrl'
      })
      .when('/kancelaria', {
          templateUrl: 'views/static/patron.html',
          controller: 'StaticCtrl'
      })
      .when('/grupy', {
          templateUrl: 'views/static/patron.html',
          controller: 'StaticCtrl'
      })
      .when('/kontakt', {
          templateUrl: 'views/static/patron.html',
          controller: 'StaticCtrl'
      })
      .when('/galeria', {
          templateUrl: 'views/static/patron.html',
          controller: 'StaticCtrl'
      })
      .when('/admin', {
          templateUrl: 'views/login/login.html',
          controller: 'LoginCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }).factory('socket', function ($rootScope) {
	var socket = io.connect('http://localhost:9000');
	return {
		on: function (eventName, callback) {
    socket.on(eventName, function () {  
      var args = arguments;
      $rootScope.$apply(function () {
				callback.apply(socket, args);
      });
    });
	},
  emit: function (eventName, data, callback) {
    socket.emit(eventName, data, function () {
      var args = arguments;
      $rootScope.$apply(function () {
        if (callback) {
					callback.apply(socket, args);
        }
      });
    });
    }
  };
});