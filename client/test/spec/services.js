/*global angular, beforeEach, describe, it, inject, spyOn*/
const expect = require('must-dist');
require('../../shared/services');
describe('Services', () => {
  beforeEach(() => {
    angular.mock.module('Services');
  });

  describe('AddressService', () => {
    let AddressService, $httpBackend, $rootScope;
    beforeEach(() => {
      inject((_AddressService_, _$httpBackend_, _$rootScope_) => {
        AddressService = _AddressService_;
        $httpBackend = _$httpBackend_;
        $rootScope = _$rootScope_;
        spyOn($rootScope, '$emit');
      });
    });
    describe('delete()', () => {
      it('sends a DELETE request to the server and emits a message', () => {
        $httpBackend.expectDELETE('/address/3').respond(200);
        AddressService.delete(3);
        $httpBackend.flush();

        expect($rootScope.$emit.calls.mostRecent().args[0]).to.be('message');
        expect($rootScope.$emit.calls.mostRecent().args[1]).to.be('3 successfully deleted.');
      });
    });
    describe('get()', () => {
      it('gets all records', () => {
        $httpBackend.expectGET('/address/').respond(200, {
          addresses: [{
            name: 'foo',
            _id: 4
          }, {
            name: 'bar',
            _id: 10
          }]
        });

        AddressService.get().then((result) => {
          expect(result.data.addresses).to.eql([{
            name: 'foo',
            _id: 4
          }, {
            name: 'bar',
            _id: 10
          }]);
        });
        $httpBackend.flush();
        $rootScope.$digest();

        expect($rootScope.$emit.calls.mostRecent().args[0]).to.be('message');
        expect($rootScope.$emit.calls.mostRecent().args[1]).to.be('2 addresses successfully retrieved.');
      });

      it('gets a single record', () => {
        $httpBackend.expectGET('/address/4').respond(200, {
          firstName: 'foo',
          lastName: 'bar',
          _id: 4
        });

        AddressService.get(4).then((result) => {
          expect(result.data).to.eql({
            firstName: 'foo',
            lastName: 'bar',
            _id: 4
          });
        });
        $httpBackend.flush();
        $rootScope.$digest();
        expect($rootScope.$emit.calls.mostRecent().args[0]).to.be('message');
        expect($rootScope.$emit.calls.mostRecent().args[1]).to.be('foo bar successfully retrieved.');
      });
    });
    describe('update()', () => {
      it('sends the update to the server, updates the update time, and emits an event', () => {
        const now = Date.now();
        const address = {
          _id: 0,
          firstName: 'Jesse',
          lastName: 'Pinkman'
        };
        $httpBackend.expectPUT('/address/0', address).respond(200, {
          updated: now,
          numberUpdated: 1
        });

        AddressService.update(0, address).then((result) => {
          expect(result.updated).to.equal(now);
        });
        $httpBackend.flush();
        $rootScope.$digest();

        expect($rootScope.$emit.calls.mostRecent().args[0]).to.be('message');
        expect($rootScope.$emit.calls.mostRecent().args[1]).to.be('Jesse Pinkman successfully updated.');
      });
    });
  });
});
