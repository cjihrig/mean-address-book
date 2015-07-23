/*global angular*/
const Services = angular.module('Services', []);
const AddressService = class AddressService {
  constructor ($http, $rootScope) {
    this.$http = $http;
    this.$rootScope = $rootScope;
  }
  get (id = '') {
    return this.$http.get(`/address/${id}`).then((result) => {
      const data = result.data;
      if (data._id) {
        this.$rootScope.$emit('message', `${data.firstName} ${data.lastName} successfully retrieved.`);
      }
      else {
        this.$rootScope.$emit('message', `${data.addresses.length} addresses successfully retrieved.`);
      }
      return result;
    });
  }
  update (id, address) {
    return this.$http.put(`/address/${id}`, address).then((result) => {
      this.$rootScope.$emit('message', `${address.firstName} ${address.lastName} successfully updated.`);
      address.updated = result.data.updated;
      return address;
    });
  }
  delete (id) {
    return this.$http.delete(`/address/${id}`).then(() => {
      return this.$rootScope.$emit('message', `${id} successfully deleted.`);
    });
  }
  new (address) {
    return this.$http.post('/address', address).then((result) => {
      this.$rootScope.$emit('message', `${address.firstName} ${address.lastName} successfully created.`);
      return result;
    });
  }
  static AddressServiceFactory ($http, $rootScope) {
    return new AddressService($http, $rootScope);
  }
};

AddressService.AddressServiceFactory.$inject = ['$http', '$rootScope'];

Services.service('AddressService', AddressService.AddressServiceFactory);
