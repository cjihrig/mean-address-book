/*global angular, beforeEach, describe, it, inject, spyOn*/
const expect = require('must-dist');
const module = angular.mock.module;
require('../../components/details/detailsController');
describe('Details Controller', () => {
  let detailsController;
  const mockAddress = {};

  let $controller;
  let $location;
  let $rootScope;
  let $routeParams;

  beforeEach(() => {
    module('ngRoute');
    module('DetailsModule');
    module(($provide) => {
      $provide.value('STATES', ['AL', 'AK', 'AZ', 'AR']);
      $provide.value('AddressService', mockAddress);
    });

    inject(($q, _$controller_, _$location_, _$rootScope_, _$routeParams_) => {
      $controller = _$controller_;
      $location = _$location_;
      $rootScope = _$rootScope_;
      $routeParams = _$routeParams_;

      mockAddress.get = (id) => {
        return $q((resolve, reject) => {
          return resolve({ data: id });
        });
      };
      mockAddress.update = (id, data) => {
        return $q((resolve, reject) => {
          return resolve(id, data);
        });
      };
      mockAddress.new = (address) => {
        return $q((resolve, reject) => {
          address._id = 42;
          return resolve({
            data: address
          });
        });
      };
      mockAddress.delete = (id) => {
        return $q((resolve, reject) => {
          return resolve();
        });
      };

      spyOn(mockAddress, 'get').and.callThrough();
      spyOn(mockAddress, 'update').and.callThrough();
      spyOn(mockAddress, 'new').and.callThrough();
      spyOn(mockAddress, 'delete').and.callThrough();
      spyOn($location, 'path');
    });
  });
  describe('constructor()', () => {
    it('retrieves the record from the database if there is a route parameter', () => {
      $routeParams.id = 1;
      detailsController = $controller('DetailsController');
      $rootScope.$digest();
      expect(detailsController.address).to.equal(1);
      expect(mockAddress.get.calls.mostRecent().args[0]).to.equal(1);
    });

    it('does not retrieve the record if there is not a route parameter', () => {
      detailsController = $controller('DetailsController');
      $rootScope.$digest();
      expect(detailsController.address).to.eql({});
      expect(mockAddress.get.calls.count()).to.equal(0);
    });
  });
  describe('updateAddress()', () => {
    it('calls the addressService update() method if the record exists', () => {
      detailsController = $controller('DetailsController');
      detailsController.updateForm = { $valid: true };
      detailsController.address = {
        _id: 4,
        firstName: 'Walter',
        secondName: 'White'
      };

      detailsController.updateAddress(4);

      expect(mockAddress.update.calls.mostRecent().args[0]).to.equal(4);
      expect(mockAddress.update.calls.mostRecent().args[1]).to.eql({
        _id: 4,
        firstName: 'Walter',
        secondName: 'White'
      });
    });
    it('calls the addressService new() method if the record does not exist', () => {
      detailsController = $controller('DetailsController');
      detailsController.updateForm = { $valid: true };
      detailsController.address = {
        firstName: 'Jesse',
        secondName: 'Pinkman'
      };

      detailsController.updateAddress();

      expect(mockAddress.new.calls.mostRecent().args[0]).to.eql({
        _id: 42,
        firstName: 'Jesse',
        secondName: 'Pinkman'
      });
      $rootScope.$digest();
      expect($location.path.calls.mostRecent().args[0]).to.equal('/edit/42');
    });
  });
  describe('deleteAddress()', () => {
    it('calls the delete method of the AddressService and navigates the user to /', () => {
      detailsController = $controller('DetailsController');
      detailsController.deleteAddress({ _id: 99 });
      $rootScope.$digest();
      expect(mockAddress.delete.calls.mostRecent().args[0]).to.equal(99);
    });
  });
});
