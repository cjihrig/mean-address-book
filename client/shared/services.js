const angular = require('angular');

const AddressService = class AddressService {
  constructor($http) {
    this.$http = $http;
  }
  get(id = '') {
    return this.$http.get(`/address/${id}`).then((result) => {
      this.addresses = result.data.addresses;
    });
  }
  static AddressServiceFactory ($http) {
    const result = new AddressService($http);
    result.get();
    return result;
  }
}
AddressService.AddressServiceFactory.$inject = ['$http'];

angular.module('Services', []).service('AddressService', AddressService.AddressServiceFactory);
