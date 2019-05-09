import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  form;
  value;
  rRule;

  firstDay;
  lastDay;
  constructor(private formBuilder: FormBuilder) {}
  ngOnInit() {
    const date = new Date();
    this.firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    this.lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    this.form = this.formBuilder.group({
      testRule: 'DTSTART:20190508T183000Z RRULE:FREQ=WEEKLY;INTERVAL=2;BYDAY=WE,FR',
    });

    this.form.valueChanges.subscribe(() => {
      this.rRule = this.form.value.testRule.rRule;
    });
  }
}
