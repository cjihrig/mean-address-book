/*global angular*/
const DetailsController = class DetailsController {
  constructor ($timeout, $routeParams, AddressService, MessagingService, $location, STATES) {
    this.$timeout = $timeout;
    this.$routeParams = $routeParams;
    this.$location = $location;
    this.addressService = AddressService;
    this.messagingService = MessagingService;
    this.states = STATES;
    this.address = {};

    if (this.$routeParams.id) {
      this.addressService.get(this.$routeParams.id).then((result) => {
        this.address = result.data;
      });
    }
  }
  updateAddress (id) {
    if (this.updateForm.$valid) {
      if (id) {
        this.addressService.update(this.$routeParams.id, this.address);
      } else {
        this.addressService.new(this.address).then((result) => {
          this.$location.path(`/edit/${result.data._id}`);
        });
      }
    }
  }
  deleteAddress (item) {
    this.addressService.delete(item._id).then(() => {
      this.$location.path('/');
    });
  }
};

DetailsController.$inject = ['$timeout', '$routeParams', 'AddressService', 'MessagingService', '$location', 'STATES'];

angular.module('DetailsModule', []).controller('DetailsController', DetailsController);
module.exports = DetailsController;
