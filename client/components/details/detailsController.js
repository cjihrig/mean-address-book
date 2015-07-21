/*global angular*/
const DetailsController = class DetailsController {
  constructor ($timeout, $routeParams, AddressService, MessagingService, $location, STATES) {
    this.$timeout = $timeout;
    this.$routeParams = $routeParams;
    this.$location = $location;
    this.addressService = AddressService;
    this.messagingService = MessagingService;
    this.states = STATES;

    if (!this.addressService.address._id && this.$routeParams.id) {
      this.addressService.get(this.$routeParams.id);
    }
  }
  updateAddress (id) {
    const address = this.addressService.address;

    if (id) {
      this.addressService.update(this.$routeParams.id, address);
    } else {
      this.addressService.new(address).then((result) => {
        this.$location.path(`/edit/${result._id}`);
      });
    }
  }
  deleteAddress (item) {
    this.addressService.delete(item._id).then(() => {
      this.addressService.set();
      this.$location.path('/');
    });
  }
};

DetailsController.$inject = ['$timeout', '$routeParams', 'AddressService', 'MessagingService', '$location', 'STATES'];

angular.module('DetailsModule', []).controller('DetailsController', DetailsController);
module.exports = DetailsController;