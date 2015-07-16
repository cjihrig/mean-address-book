const angular = require('angular');

const ListController = class ListController {
  constructor ($route, $timeout, AddressService, MessagingService) {
    this.$route = $route;
    this.$timeout = $timeout;
    this.addressService = AddressService;
    this.messagingService = MessagingService;
  }
  deleteAddress (item) {
    this.addressService.delete(item._id).then(() => {
      this.messagingService.setMessage(`${item.firstName} ${item.lastName} successfully deleted.`);
      this.$timeout(() => {
        this.messagingService.reset();
      }, 2000);
    });
  }
};

ListController.$inject = ['$route', '$timeout', 'AddressService', 'MessagingService'];

angular.module('ListModule', []).controller('ListController', ListController);
module.exports = ListController;
