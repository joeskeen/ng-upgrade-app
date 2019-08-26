import { NgModule } from '@angular/core';
import {
  InputModule,
  FormFieldModule,
  ButtonModule
} from '@healthcatalyst/cashmere';

@NgModule({ exports: [InputModule, FormFieldModule, ButtonModule] })
export class CashmereModule {}
