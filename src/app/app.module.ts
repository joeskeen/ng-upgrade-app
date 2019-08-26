import { NgModule, DoBootstrap, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { UpgradeModule } from '@angular/upgrade/static';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello/hello.component';
import { Ng1DirectivesModule } from 'src/ng1/ng1-directives.module';
import { Ng1ServicesModule } from 'src/ng1/ng1-services.module';
import { UrlHandlingStrategy, RouterModule } from '@angular/router';
import { CashmereModule } from './cashmere.module';

export class DisableAngularRouterStrategy implements UrlHandlingStrategy {
  shouldProcessUrl() {
    return false;
  }
  extract(url) {
    return url;
  }
  merge(url) {
    return url;
  }
}

@NgModule({
  imports: [
    RouterModule.forRoot([]),
    BrowserModule,
    FormsModule,
    UpgradeModule,
    Ng1DirectivesModule,
    Ng1ServicesModule,
    CashmereModule
  ],
  declarations: [AppComponent, HelloComponent],
  entryComponents: [AppComponent, HelloComponent],
  providers: [
    { provide: UrlHandlingStrategy, useClass: DisableAngularRouterStrategy }
  ]
})
export class AppModule implements DoBootstrap {
  ngDoBootstrap() {
    /* bootstrap will happen from AngularJS side */
  }
}
