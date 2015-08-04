/*global angular*/
const DetailsController = class DetailsController {
  constructor ($routeParams, AddressService, $location, STATES) {
    this.$routeParams = $routeParams;
    this.$location = $location;
    this.addressService = AddressService;
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
        this.addressService.update(id, this.address);
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

DetailsController.$inject = ['$routeParams', 'AddressService', '$location', 'STATES'];

angular.module('DetailsModule', []).controller('DetailsController', DetailsController);
module.exports = DetailsController;
