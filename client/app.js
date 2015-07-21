/*global angular*/
require('../style/main');
require('./shared/services');

const list = require('./components/list');
const view = require('./components/details');
const App = angular.module('App', ['ngRoute', 'ListModule', 'DetailsModule', 'Services']);

App.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $routeProvider.when('/', {
    template: list.template,
    controller: list.controller,
    controllerAs: 'list'
  });
  $routeProvider.when('/edit/:id?', {
    template: view.template,
    controller: view.controller,
    controllerAs: 'details'
  });
}]);
