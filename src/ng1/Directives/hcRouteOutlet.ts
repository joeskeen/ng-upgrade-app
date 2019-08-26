import { IDirectiveFactory } from 'angular';

export const hcRouteOutletDirectiveFactory: IDirectiveFactory = () => ({
  restrict: 'E',
  template: '<div ui-view></div>'
});
