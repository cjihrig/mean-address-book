/*global angular, beforeEach, describe, it, inject, spyOn*/
const expect = require('must-dist');
require('../../components/details/detailsController');
describe('Details Controller', function () {
  let $q;
  let $rootScope;
  let $timeout;
  let $routeParams;
  let $controller;
  const mockAddress = {
    get: function (id) {},
    update: function () {
      return $q(function (resolve, rejct) {
        return resolve();
      });
    }
  };
  const mockMessage = {
    setMessage: function (message) {
      this.message = message;
    },
    reset: function () {
      this.message = undefined;
    }
  };
  beforeEach(function () {
    angular.mock.module('ngRoute');
    angular.mock.module('DetailsModule');
    inject(function (_$rootScope_, _$controller_, _$q_, _$timeout_, _$routeParams_) {
      $rootScope = _$rootScope_;
      $timeout = _$timeout_;
      $q = _$q_;
      $routeParams = _$routeParams_;
      $controller = _$controller_;
      spyOn(mockAddress, 'get');
    });
  });
  describe('constructor()', function () {
    it('retrieves the record from the database only if the AddressService is empty', function () {
      mockAddress.address = {};
      $routeParams.id = 1;
      $controller('DetailsController', {
        AddressService: mockAddress,
        MessagingService: mockMessage
      });

      expect(mockAddress.get.calls.mostRecent().args[0]).to.be(1);
    });

    it('uses the address key on the address service if set', function () {
      mockAddress.address = { _id: 1, firstName: 'Walter' };
      $routeParams.id = 1;
      $controller('DetailsController', {
        AddressService: mockAddress,
        MessagingService: mockMessage
      });

      expect(mockAddress.get.calls.count()).to.be(0);
    });
  });
  describe('updateAddress()', function () {
    let controller;
    beforeEach(function () {
      controller = $controller('DetailsController', {
        AddressService: mockAddress,
        MessagingService: mockMessage
      });
    });
    it('sets a success message on successful update of a record', function () {

      mockAddress.address = { _id: 5, firstName: 'Walter', lastName: 'White' };
      controller.updateAddress();
      $rootScope.$digest();
      expect(mockMessage.message).to.be('Walter White successfully updated.');
      $timeout.flush();
      expect(mockMessage.message).to.be.undefined();
    });
  });
});
