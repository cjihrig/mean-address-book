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
      } else {
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
};

AddressService.$inject = ['$http', '$rootScope'];
Services.service('AddressService', AddressService);

const ErrorInterceptor = class ErrorInterceptor {
  constructor ($q, $rootScope) {
    this.$q = $q;
    this.$rootScope = $rootScope;

    // Need to do this because responseError is called from Angular and the context isn't corrected handled.
    this.responseError = (rejection) => {
      if (rejection.status >= 401) {
        this.$rootScope.$emit('error', `There was an error during the $http request - ${rejection.config.method} ${rejection.config.url}.\n
        DATA[${rejection.data.substring(0, 100)}...]`);
      }
      return this.$q.reject(rejection);
    };
  }
};

ErrorInterceptor.$inject = ['$q', '$rootScope'];
Services.service('errorInterceptor', ErrorInterceptor);
