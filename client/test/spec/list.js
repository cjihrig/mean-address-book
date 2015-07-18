describe('List Controller', function () {
  var controller;
  var $q;
  var $rootScope;
  var $timeout;
  var mockAddress = {};
  var mockMessage = {
    setMessage: function (message) {
      this.message = message;
    },
    reset: function () {
      this.message = undefined;
    }
  };
  beforeEach(function () {
      module('App');
      inject(function (_$rootScope_, $controller, _$q_, _$timeout_) {
        $rootScope = _$rootScope_;
        $timeout = _$timeout_;
        $q = _$q_;
        controller = $controller('ListController', {
          'AddressService': mockAddress,
          'MessagingService': mockMessage
        });
    });
  });

  describe('deleteAddress()', function () {
    beforeAll(function () {
      mockAddress.delete = function(id) {
        return $q(function (resolve, rejct) {
          return resolve(id);
        });
      }
    });
    it('sets a success message on successful deletion then clears the message', function () {
      controller.deleteAddress({ _id: 5, firstName: 'Walter', lastName: 'White' });
      $rootScope.$digest();
      Must(mockMessage.message).to.be('Walter White successfully deleted.');
      $timeout.flush();
      Must(mockMessage.message).to.be.undefined();
    });
  });
});
