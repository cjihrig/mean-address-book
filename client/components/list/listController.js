/*global angular*/
const ListController = class ListController {
  constructor ($timeout, $location, AddressService) {
    this.$timeout = $timeout;
    this.$location = $location;
    this.addressService = AddressService;

    this.addressService.get().then((result) => {
      this.addressList = result.data.addresses;
    });
  }
  deleteAddress (item) {
    this.addressService.delete(item._id).then(() => {
      const index = this.addressList.findIndex((address) => address._id === item._id);
      if (index !== -1) {
        this.addressList.splice(index, 1);
      }
    });
  }
  editAddress (item) {
    this.$location.url(`/edit/${item._id}`);
  }
  newAddress () {
    this.$location.url('/edit/');
  }
};

ListController.$inject = ['$timeout', '$location', 'AddressService'];

angular.module('ListModule', []).controller('ListController', ListController);
module.exports = ListController;
