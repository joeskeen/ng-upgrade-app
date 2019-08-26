import { NgModule } from '@angular/core';

@NgModule({
  providers: [upgradeProvider('$rootScope'), upgradeProvider('$state')]
})
export class Ng1ServicesModule {}

function upgradeProvider(ng1Name: string) {
  return {
    provide: ng1Name,
    deps: ['$injector'],
    useFactory: ($injector: ng.auto.IInjectorService) => $injector.get(ng1Name)
  };
}
