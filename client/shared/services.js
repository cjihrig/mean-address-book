/*global angular*/
const Services = angular.module('Services', []);
const AddressService = class AddressService {
  constructor ($http) {
    this.$http = $http;
  }
  get (id = '') {
    return this.$http.get(`/address/${id}`);
  }
  update (id, address) {
    return this.$http.put(`/address/${id}`, address);
  }
  delete (id) {
    return this.$http.delete(`/address/${id}`);
  }
  new (address) {
    return this.$http.post('/address', address);
  }
  set (address = {}) {
    this.address = address;
  }
  static AddressServiceFactory ($http) {
    return new AddressService($http);
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
