/*global angular*/
const MessageController = class MessageController {
  constructor ($rootScope, $timeout) {
    this.$rootScope = $rootScope;
    this.$timeout = $timeout;
    this.message = this.error = null;

    $rootScope.$on('message', (event, message) => {
      this._message('message', message);
    });
    $rootScope.$on('error', (event, error) => {
      this._message('error', error);
    });
  }
  _message(type, content) {
    this[type] = content;
    this.$timeout(() => {
      this[type] = null;
    }, 2000);
  }
};

MessageController.$inject = ['$rootScope', '$timeout'];

angular.module('SharedControllers', []).controller('MessageController', MessageController);
module.exports = MessageController;
