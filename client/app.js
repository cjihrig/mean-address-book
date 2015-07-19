require('../style/main');
require('./shared/services');

const list = require('./components/list');
const App = angular.module('App', ['ngRoute', 'ListModule', 'Services']);

App.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/', {
    template: list.template,
    controller: list.controller,
    controllerAs: 'list'
  });
}]);
