import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  form: FormGroup;
  rRule;

  firstDay;
  lastDay;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    const date = new Date();
    this.firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    this.lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    this.form = this.formBuilder.group({
      testRule: 'DTSTART:20190502T000000Z RRULE:FREQ=MONTHLY;INTERVAL=2;BYSETPOS=-1;BYDAY=-1MO;UNTIL=20190831T000000Z',
    });

    this.form.valueChanges.subscribe(() => {
      this.rRule = this.form.value.testRule.rRule;
    });
  }

  rruleChange(e) {
    const rrule = e.target.value;
    this.form.setValue({
      testRule:
        rrule
    });
  }

}
