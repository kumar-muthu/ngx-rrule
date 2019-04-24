import {Component, OnInit, Output, forwardRef, EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'ngx-weekly',
  templateUrl: './weekly.component.html',
  styleUrls: ['./weekly.component.css'],
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => WeeklyComponent), multi: true}]
})
export class WeeklyComponent implements OnInit, ControlValueAccessor {
  @Output() onChange = new EventEmitter();
  public weeklyForm: FormGroup;
  private propagateChange;
  public  value = {
    interval: 0,
    days: []
  };

  public days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.weeklyForm = this.formBuilder.group({
      mon: false,
      tue: false,
      wed: false,
      thu: false,
      fri: false,
      sat: false,
      sun: false,
      weeklyInterval: 0,
    });
  }

  writeValue = (input: any): void => {
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  onFormChange = () => {
    this.value.interval = this.weeklyForm.value.weeklyInterval;
    this.value.days = _.pickBy(this.weeklyForm.value, r => r === true);
    this.propagateChange(this.value);
    this.onChange.emit();
  }
}
