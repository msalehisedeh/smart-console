import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SmartConsoleService } from './smart-console.service';

@NgModule({
  declarations: [],
  exports: [],
  imports: [CommonModule],
  providers: [SmartConsoleService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SmartConsoleModule { }
