/*global angular*/
const ListController = class ListController {
  constructor ($timeout, $location, AddressService, MessagingService) {
    this.$timeout = $timeout;
    this.$location = $location;
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
  editAddress (item) {
    this.addressService.set(item);
    this.$location.url(`/${item._id}`);
  }
};

ListController.$inject = ['$timeout', '$location', 'AddressService', 'MessagingService'];

angular.module('ListModule', []).controller('ListController', ListController);
module.exports = ListController;
