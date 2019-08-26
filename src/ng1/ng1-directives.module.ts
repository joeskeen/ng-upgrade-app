import { NgModule, Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';

/* tslint:disable:directive-selector */

@Directive({ selector: 'hc-data-entry' })
export class HcDataEntryWrapperComponent extends UpgradeComponent {
  constructor(elementRef: ElementRef, injector: Injector) {
    super('hcDataEntry', elementRef, injector);
  }
}

@Directive({ selector: 'hc-route-outlet' })
export class HcRouteOutletWrapperComponent extends UpgradeComponent {
  constructor(elementRef: ElementRef, injector: Injector) {
    super('hcRouteOutlet', elementRef, injector);
  }
}

@NgModule({
  declarations: [HcDataEntryWrapperComponent, HcRouteOutletWrapperComponent],
  exports: [HcDataEntryWrapperComponent, HcRouteOutletWrapperComponent]
})
export class Ng1DirectivesModule {}
