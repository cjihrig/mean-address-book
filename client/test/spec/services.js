describe('Services', function () {
  beforeEach(function () {
    module('Services');
  });

  var MessagingService
  describe('MessagingService', function () {
    beforeEach(function () {
      inject(function (_MessagingService_) {
          MessagingService = _MessagingService_;
      });
    });

    it('has methods to set error and message', function () {
      MessagingService.setError('mock error');
      Must(MessagingService.error).to.equal('mock error');
      MessagingService.setMessage('mock message');
      Must(MessagingService.message).to.equal('mock message');
    });
    it('reset() clears all of the message information', function () {
      MessagingService.setError('mock error');
      MessagingService.setMessage('mock message');
      MessagingService.reset();
      Must(MessagingService.message).to.equal('');
      Must(MessagingService.error).to.equal('');
    });
  });
  describe('AddressService', function () {
    var AddressService, $httpBackend
    beforeEach(function () {
      inject(function (_AddressService_, _$httpBackend_) {
          AddressService = _AddressService_;
          $httpBackend = _$httpBackend_;
          $httpBackend.expectGET('/address/').respond(200, {
            addresses: [{ _id: 0 }, { _id: 1 }]
          });
          $httpBackend.flush();
          Must(AddressService.addressList).to.eql([{ _id: 0 }, { _id: 1 }]);
      });
    });
    describe('delete()', function () {
      it('sends a DELETE request to the server and removes it from the in-memory list', function () {
        $httpBackend.expectDELETE('/address/1').respond(200, {
          _id: 3
        });
        AddressService.delete(1);
        $httpBackend.flush();

        Must(AddressService.addressList.length).to.be(1);
        Must(AddressService.deletedAddress).to.eql({ _id: 3 });
      });
    });
    describe('get()', function () {
      it('copies the result into this.address when passing an id', function () {
        $httpBackend.expectGET('/address/4').respond(200, {
          name: 'foo',
          _id: 4
        });
        AddressService.get(4).then(function () {
          Must(AddressService.address).to.eql({
            name: 'foo',
            _id: 4
          });
        });
        $httpBackend.flush();
      });
    });
  });
});
