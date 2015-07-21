/*global angular*/
const ListController = class ListController {
  constructor ($timeout, $location, AddressService, MessagingService) {
    this.$timeout = $timeout;
    this.$location = $location;
    this.addressService = AddressService;
    this.messagingService = MessagingService;
  }
  deleteAddress (item) {
    this.addressService.delete(item._id);
  }
  editAddress (item) {
    this.addressService.set(item);
    this.$location.url(`/edit/${item._id}`);
  }
  newAddress () {
    this.addressService.set();
    this.$location.url('/edit/');
  }
};

ListController.$inject = ['$timeout', '$location', 'AddressService', 'MessagingService'];

angular.module('ListModule', []).controller('ListController', ListController);
module.exports = ListController;
