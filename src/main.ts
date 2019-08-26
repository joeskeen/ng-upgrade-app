import './polyfills';
import * as angular from 'angular';
import { ng1App, ng1AppName } from './ng1/main';

import { enableProdMode, NgModuleRef } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {
  UpgradeModule,
  setAngularJSGlobal,
  downgradeComponent,
  downgradeInjectable
} from '@angular/upgrade/static';
import { ModalService } from '@healthcatalyst/cashmere';

import { AppModule } from './app/app.module';
import { ConfigService } from './app/services/config.service';
import { AppComponent } from './app/app.component';
import { HelloComponent } from './app/hello/hello.component';

setAngularJSGlobal(angular);

bootstrapApplication();

async function bootstrapApplication() {
  try {
    const ref = await platformBrowserDynamic().bootstrapModule(AppModule);
    ensureGracefulStackBlitzHotReload(ref);

    const injector = ref.injector;

    // the AngularJS app expects the server config to be a constant, so wire that up
    const configService = injector.get<ConfigService>(ConfigService);
    const config = await configService.get().toPromise();
    ng1App.constant('ServerConfig', config);
    console.debug('ServerConfig constant registered with ng1.', config);

    // register Angular components and services with AngularJS
    ng1App.directive(
      'appRoot',
      downgradeComponent({ component: AppComponent })
    );
    ng1App.directive(
      'hello',
      downgradeComponent({ component: HelloComponent })
    );
    ng1App.factory('modalService', () =>
      injector.get<ModalService>(ModalService)
    );

    // bootstrap the AngularJS app
    const upgrade = injector.get(UpgradeModule) as UpgradeModule;
    upgrade.bootstrap(document.documentElement, [ng1AppName], {
      strictDi: true
    });

    console.debug('Hybrid application bootstrapped.');
  } catch (err) {
    console.error('error bootstrapping hybrid application', err);
  }
}

function ensureGracefulStackBlitzHotReload(ref: NgModuleRef<AppModule>) {
  // Ensure Angular destroys itself on hot reloads.
  if (window['ngRef']) {
    window['ngRef'].destroy();
  }
  window['ngRef'] = ref;
}
