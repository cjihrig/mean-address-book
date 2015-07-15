const angular = require('angular');
const templates = require('./templates');

const App = angular.module('App', [require('angular-route'), 'List']);

App.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/', {
    template: templates.list,
    controller: 'ListController',
    controllerAs: 'list'
  });
}]);
