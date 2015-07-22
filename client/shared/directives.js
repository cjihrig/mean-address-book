/*global angular*/
const Directives = angular.module('Directives', []);

const UpdateTime = class UpdateTime {
  constructor () {
    this.restrict = 'E';
    this.scope = {
      data: '=address',
      containerclass: '@'
    };
    this.template = `<div ng-if="data.updated || data.created" class={{containerclass}}>Last update: {{ data.updated || data.created | date : "yyyy-MM-dd (HH:mm:ss)" }}</div>`;
  }
  static UpdateTimeFactory () {
    return new UpdateTime();
  }
};

Directives.directive('updateTime', UpdateTime.UpdateTimeFactory);
