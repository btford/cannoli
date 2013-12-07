angular.module('yum', ['ngRoute', 'btford.markdown']).
  config(function ($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        controller: 'IndexController',
        templateUrl: '/partials/index'
      }).
      when('/page/:id', {
        controller: 'PageController',
        templateUrl: '/partials/page'
      }).
      when('/new/page', {
        controller: 'NewPageController',
        templateUrl: '/partials/new-page'
      }).
      when('/page/:id/edit', {
        controller: 'EditPageController',
        templateUrl: '/partials/edit-page'
      }).
      when('/page/:id/delete', {
        controller: 'DelPageController',
        templateUrl: '/partials/del-page'
      }).
      otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  }).
  controller('PageController', function ($scope, $routeParams, $http) {
    $http.get('/api/page/' + $routeParams.id).success(function (data) {
      $scope.page = data;
    });
  }).
  controller('IndexController', function ($scope, $http) {
    $http.get('/api/index').success(function (data) {
      $scope.pages = data;
    });
  }).
  controller('NewPageController', function ($scope, $http, $location) {
    $scope.page = {};
    $scope.createPage = function () {
      $http.post('/api/page', $scope.page).success(function (data) {
        $location.url('/page/' + $scope.page.title);
      });
    };
  }).
  controller('EditPageController', function ($scope, $http, $location, $routeParams) {
    $scope.page = {};
    $http.get('/api/page/' + $routeParams.id).success(function (data) {
      $scope.page = data;
    });
    $scope.editPage = function () {
      $http.post('/api/page', $scope.page).success(function (data) {
        $location.url('/page/' + $scope.page.title);
      });
    };
  }).
  controller('DelPageController', function ($scope, $http, $location, $routeParams) {
    $scope.page = {};
    $http.get('/api/page/' + $routeParams.id).success(function (data) {
      $scope.page = data;
    });
    $scope.delPage = function () {
      $http.delete('/api/page/' + $routeParams.id).success(function () {
        $location.url('/');
      });
    };
  });
