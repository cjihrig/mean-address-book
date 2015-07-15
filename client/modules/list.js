const angular = require('angular');

const ListController = class ListController {
  constructor ($route) {
    this._deps['$route'] = $route;
    this.message = 'Welcome to a really MEAN address book!';
  }
};
// Keep the code from breaking during minification
ListController.$inject = ['$route'];

angular.module('List', []).controller('ListController', ListController);
