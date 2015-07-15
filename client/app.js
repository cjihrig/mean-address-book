const angular = require('angular');
const templates = require('./templates');

angular.module('App', [require('angular-route'), 'List'])
.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/', {
    template: templates.list,
    controller: 'ListController',
    controllerAs: 'list'
  })
}]);
