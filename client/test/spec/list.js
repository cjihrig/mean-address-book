/*global angular, beforeEach, describe, it, inject, spyOn*/
const expect = require('must-dist');
const module = angular.mock.module;
require('../../components/list/ListController');
describe('List Controller', () => {
  let listController;
  const mockAddress = {};

  let $location;
  let $rootScope;
  beforeEach(() => {
    module('ngRoute');
    module('ListModule');
    module(($provide) => {
      $provide.value('AddressService', mockAddress);
    });
    inject(($controller, $q, _$location_, _$rootScope_) => {
      mockAddress.get = () => {
        return $q((resolve, reject) => {
          return resolve({
            data: {
              addresses: [{ _id: 1 }, { _id: 2 }]
            }
          });
        });
      };
      mockAddress.delete = (id) => {
        return $q((resolve, rejct) => {
          return resolve(id);
        });
      };

      $rootScope = _$rootScope_;
      $location = _$location_;

      spyOn(mockAddress, 'get').and.callThrough();
      spyOn(mockAddress, 'delete').and.callThrough();
      spyOn($location, 'url');
      listController = $controller('ListController');
      // Resolve the pending get promise
      $rootScope.$digest();
    });
  });
  describe('constructor()', () => {
    it('retrives a list of all the addresses', () => {
      expect(mockAddress.get.calls.mostRecent().args).to.have.length(0);
      expect(listController.addressList).to.eql([{ _id: 1 }, { _id: 2 }]);
    });
  });
  describe('deleteAddress()', () => {
    it('removes the in-memory address on success', () => {
      listController.deleteAddress({ _id: 1 });
      $rootScope.$digest();
      expect(listController.addressList).to.eql([{ _id: 2 }]);
    });
  });
  describe('editAddress()', () => {
    it('redirects the user to the edit url', () => {
      listController.editAddress({ _id: 2 });
      expect($location.url.calls.mostRecent().args[0]).to.equal('/edit/2');
    });
  });
  describe('newAddress()', () => {
    it('redirects the user to the new user edit url', () => {
      listController.newAddress();
      expect($location.url.calls.mostRecent().args[0]).to.equal('/edit/');
    });
  });
});
