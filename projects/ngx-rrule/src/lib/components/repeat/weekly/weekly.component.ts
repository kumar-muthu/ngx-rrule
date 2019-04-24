import {Component, OnInit, forwardRef, EventEmitter, Output} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'ngx-weekly',
  templateUrl: './weekly.component.html',
  styleUrls: ['./weekly.component.css'],
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => WeeklyComponent), multi: true}]
})
export class WeeklyComponent implements OnInit, ControlValueAccessor {
  public weeklyForm: FormGroup;
  @Output() onChange = new EventEmitter();

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

  propagateChange = (_: any) => {
  }

  onFormchange = () => {
    this.propagateChange('');
    this.onChange.emit('');
  }
}
