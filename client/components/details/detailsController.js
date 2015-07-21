/*global angular*/
const DetailsController = class DetailsController {
  constructor ($timeout, $routeParams, AddressService, MessagingService) {
    this.$timeout = $timeout;
    this.$routeParams = $routeParams;
    this.addressService = AddressService;
    this.messagingService = MessagingService;

    if (!this.addressService.address._id) {
      this.addressService.get(this.$routeParams.id);
    }
  }
  updateAddress () {
    const address = this.addressService.address;
    this.addressService.update(this.$routeParams.id, address).then(() => {
      this.messagingService.setMessage(`${address.firstName} ${address.lastName} successfully updated.`);
      this.$timeout(() => {
        this.messagingService.reset();
      }, 2000);
    });
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

DetailsController.$inject = ['$timeout', '$routeParams', 'AddressService', 'MessagingService'];

angular.module('DetailsModule', []).controller('DetailsController', DetailsController);
module.exports = DetailsController;
