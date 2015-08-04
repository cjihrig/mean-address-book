/*global angular, beforeEach, describe, it, inject, spyOn*/
const expect = require('must-dist');
const module = angular.mock.module;
require('../../components/details/detailsController');
describe('Details Controller', () => {
  let $rootScope;
  let $routeParams;
  let $controller;
  let detailsController;
  let $q;
  let $location;
  const mockAddress = {};

  beforeEach(() => {
    module('ngRoute');
    module('DetailsModule');
    module(function ($provide) {
      $provide.value('STATES', ['AL', 'AK', 'AZ', 'AR']);
      $provide.value('AddressService', mockAddress);
    });

    inject(function (_$controller_, _$routeParams_, $q, _$rootScope_, _$location_) {
      $routeParams = _$routeParams_;
      $controller = _$controller_;
      $rootScope = _$rootScope_;
      $location = _$location_;

      mockAddress.get = function (id) {
        return $q(function (resolve, rejct) {
          return resolve({ data: id });
        });
      };
      mockAddress.update = function (id, data) {
        return $q(function (resolve, rejct) {
          return resolve(id, data);
        });
      };
      mockAddress.new = function (address) {
        return $q(function (resolve, rejct) {
          address._id = 42;
          return resolve({
            data: address
          });
        });
      };

      spyOn(mockAddress, 'get').and.callThrough();
      spyOn(mockAddress, 'update').and.callThrough();
      spyOn(mockAddress, 'new').and.callThrough();
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
      }

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
});
