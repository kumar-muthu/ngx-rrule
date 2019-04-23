import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxRruleModule } from 'ngx-rrule';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxRruleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
