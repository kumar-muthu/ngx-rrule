import { NgModule } from '@angular/core';
import { NgxRruleComponent } from './ngx-rrule.component';
import { StartComponent } from './components/start/start.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EndComponent } from './components/end/end.component';
import { RepeatComponent } from './components/repeat/repeat.component';
import { HourlyComponent } from './components/repeat/hourly/hourly.component';
import { DailyComponent } from './components/repeat/daily/daily.component';
import { WeeklyComponent } from './components/repeat/weekly/weekly.component';
import { MonthlyComponent } from './components/repeat/monthly/monthly.component';
import { YearlyComponent } from './components/repeat/yearly/yearly.component';
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
  declarations: [NgxRruleComponent, StartComponent, EndComponent, RepeatComponent, HourlyComponent, DailyComponent, WeeklyComponent, MonthlyComponent, YearlyComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  exports: [NgxRruleComponent]
})
export class NgxRruleModule { }
