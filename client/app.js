const angular = require('angular');
const list = require('./components/list');

const App = angular.module('App', [require('angular-route'), 'ListModule', 'Services']);

App.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/', {
    template: list.template,
    controller: list.controller,
    controllerAs: 'list'
  });
}]);
