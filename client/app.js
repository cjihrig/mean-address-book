/*global angular*/
require('../style/main');
require('./shared');

const list = require('./components/list');
const view = require('./components/details');
const App = angular.module('App', ['ngRoute', 'DetailsModule', 'Directives', 'ListModule', 'Services', 'SharedControllers']);

const configureApp = function ($routeProvider, $locationProvider, $httpProvider) {
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
  $routeProvider.otherwise({
    redirectTo: '/'
  });
  $httpProvider.interceptors.push('ErrorInterceptor');
};
configureApp.$inject = ['$routeProvider', '$locationProvider', '$httpProvider'];
App.config(configureApp);

App.constant('STATES', ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID',
  'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV',
  'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT',
  'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
]);
