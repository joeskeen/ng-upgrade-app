import { IDirectiveFactory } from 'angular';

export const ng1AppDirectiveFactory: IDirectiveFactory = () => ({
  restrict: 'E',
  template: '<app-root>loading...</app-root>'
});
