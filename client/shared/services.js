/*global angular*/
const Services = angular.module('Services', []);
const AddressService = class AddressService {
  constructor ($http) {
    this.$http = $http;
    this.addressList = [];
    this.address = {};
  }
  get (id = '') {
    return this.$http.get(`/address/${id}`).then((result) => {
      if (id) {
        this.address = result.data;
      } else {
        this.addressList = result.data.addresses;
      }
    });
  }
  delete (id) {
    return this.$http.delete(`/address/${id}`).then((result) => {
      this.deletedAddress = result.data;
      // The delete was successful, so remove the item from the collection of elements
      const index = this.addressList.findIndex((item) => item._id === id);
      if (index !== -1) {
        this.addressList.splice(index, 1);
      }
    });
  }
  static AddressServiceFactory ($http) {
    const result = new AddressService($http);
    result.get();
    return result;
  }
};

AddressService.AddressServiceFactory.$inject = ['$http'];

Services.service('AddressService', AddressService.AddressServiceFactory);

const MessagingService = class MessagingService {
  constructor () {
    this.error = '';
    this.message = '';
  }
  _write (destination, message) {
    this[destination] = message;
  }
  setError (message) {
    this._write('error', message);
  }
  setMessage (message) {
    this._write('message', message);
  }
  reset () {
    this.error = '';
    this.message = '';
  }
  static MessagingServiceFactory () {
    return new MessagingService();
  }
};

Services.service('MessagingService', MessagingService);
