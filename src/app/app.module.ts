import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SmartConsoleModule } from './smart-console/smart-console.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SmartConsoleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
