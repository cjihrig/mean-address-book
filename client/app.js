/*global angular*/
require('../style/main');
require('./shared');

const list = require('./components/list');
const view = require('./components/details');
const App = angular.module('App', ['ngRoute', 'ListModule', 'DetailsModule', 'Services', 'Directives', 'SharedControllers']);

App.factory('errorInterceptor', ['$q', '$rootScope', function ($q, $rootScope) {
  return {
    responseError: function (rejection) {
      if (rejection.status >= 401) {
        $rootScope.$emit('error', `There was an error during the $http request - ${rejection.config.method} ${rejection.config.url}.\n
        DATA[${rejection.data.substring(0, 100)}...]`);
      }
      return $q.reject(rejection);
    }
  };
}]);

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

App.config(['$httpProvider', function ($httpProvider) {
  $httpProvider.interceptors.push('errorInterceptor');
}]);

App.constant('STATES', ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID',
  'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV',
  'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT',
  'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
]);
