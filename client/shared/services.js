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
  update (id, address) {
    return this.$http.put(`/address/${id}`, address).then((result) => {
      address.updated = result.data.updated;

      // The update was successful, so update the in-memory copy
      const index = this.addressList.findIndex((item) => item._id === id);
      if (index !== -1) {
        this.addressList[index] = address;
      }
      return result;
    });
  }
  delete (id) {
    return this.$http.delete(`/address/${id}`).then(() => {
      // The delete was successful, so remove the item from the collection of elements
      const index = this.addressList.findIndex((item) => item._id === id);
      if (index !== -1) {
        this.addressList.splice(index, 1);
      }
    });
  }
  new (address) {
    return this.$http.post('/address', address).then((result) => {
      // The add was successful, so add it to the in-memory collection
      this.addressList.push(result.data);
      return result.data;
    });
  }
  set (address = {}) {
    this.address = address;
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
