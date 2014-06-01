'use strict';

angular
  .module('tswAppAdmin', [
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
        templateUrl: 'views/admin/views/admin/main.html',
        controller: 'AdminCtrl'
      })
      .when('/search/:string', {
        templateUrl: 'views/main.html',
        controller: 'AdminCtrl'
      })
      .when('/page/:number', {
        templateUrl: 'views/main.html',
        controller: 'AdminCtrl'
      })
      .when('/add', {
        templateUrl: 'views/admin/views/admin/add.html',
        controller: 'AdminCtrl'
      })
      .when('/edit/:id', {
        templateUrl: 'views/admin/views/admin/edit.html',
        controller: 'AdminCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });