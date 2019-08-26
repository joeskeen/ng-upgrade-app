import { module, IRootScopeService } from 'angular';
import 'angular';
import 'angular-ui-router';
import { hcDataEntryDirectiveFactory } from './Directives/hcDataEntry';
import { ng1AppDirectiveFactory } from './Directives/ng1App';
import { HcFormField } from './Directives/hcFormField';
import { configureNg1App } from './config';
import { hcRouteOutletDirectiveFactory } from './Directives/hcRouteOutlet';
import { Field } from './Domain/Field';

export const ng1AppName = 'ng1App';
export const ng1App = module(ng1AppName, ['ui.router'])
  .directive({
    ng1App: ng1AppDirectiveFactory,
    hcDataEntry: hcDataEntryDirectiveFactory,
    hcRouteOutlet: hcRouteOutletDirectiveFactory,
    hcFormField: HcFormField.hcFormFieldFactory
  })
  .factory('fieldFactory', Field.getFactory)
  .config(configureNg1App);
