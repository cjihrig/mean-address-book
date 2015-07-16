const angular = require('angular');

const ListController = class ListController {
  constructor ($route, AddressService) {
    this.$route = $route;
    this.addressService = AddressService;
  }
};
// Keep the code from breaking during minification
ListController.$inject = ['$route', 'AddressService'];

angular.module('ListModule', []).controller('ListController', ListController);
module.exports = ListController;
