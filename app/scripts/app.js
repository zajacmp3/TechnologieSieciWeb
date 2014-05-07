'use strict';

angular
  .module('tswApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ngAnimate',
    'simplePagination'
  ])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
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
      .otherwise({
        redirectTo: '/'
      });
    $locationProvider
    .html5Mode(true);
  });
