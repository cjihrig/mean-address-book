require('angular');
require('angular-mocks');
require('angular-route');
require('babel-core/polyfill');
require('../shared/services');
require('../app');

//angular.module('', ['ngRoute']);

var context = require.context('./spec', true, /.+\.js/);
context.keys().forEach(context);
