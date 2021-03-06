import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  form: FormGroup;
  rRule;
  testRule;

  hideStart = false;
  hideEnd = false;
  timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  minStartDate;
  maxStartDate;
  minEndDate;
  maxEndDate;

  minStartDateText;
  maxStartDateText;
  minEndDateText;
  maxEndDateText;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    const startDate = moment().startOf('month').startOf('day').format('YYYYMMDD');
    const endDate = moment().endOf('month').endOf('day').format('YYYYMMDD');
    this.testRule = `DTSTART:${startDate}T000000 RRULE:FREQ=MONTHLY;INTERVAL=2;BYSETPOS=-1;BYDAY=-1MO;UNTIL=${endDate}T000000`;
    this.form = this.formBuilder.group({
      testRule: this.testRule
    });

    this.form.valueChanges.subscribe(() => {
      this.rRule = this.form.value.testRule.rRule;
    });
  }

  onStartDateChange(e){
    console.log(e);
  }

  onEndDateChange(e){
    console.log(e);
  }

  dateSelection(date, dt) {
    if (date) {
      const minDate = new Date(date);
      const dateConfig = {
        year: minDate.getFullYear(),
        month: minDate.getMonth() + 1,
        day: minDate.getDate()
      };
      if(dt=='minStartDate')
        this.minStartDate = dateConfig;
      else if(dt=='maxStartDate')
        this.maxStartDate = dateConfig;
      else if (dt == 'minEndDate')
        this.minEndDate = dateConfig;
      else if (dt == 'maxEndDate')
        this.maxEndDate = dateConfig;
    }
  }

  rruleChange(e) {
    const rrule = e.target.value;
    console.log(rrule);
    this.form.patchValue({
      testRule: rrule
    });
  }

}
