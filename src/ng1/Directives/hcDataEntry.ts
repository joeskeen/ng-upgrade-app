import { IDirectiveFactory } from 'angular';
import { DataEntryController } from '../Controllers/DataEntryController';

export const hcDataEntryDirectiveFactory: IDirectiveFactory = () => ({
  restrict: 'E',
  controller: DataEntryController,
  controllerAs: 'ctrl',
  templateUrl: '../Templates/DataEntryTpl.html'
});
