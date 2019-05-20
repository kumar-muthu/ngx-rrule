import {Component, OnInit, Output, forwardRef, EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {getDateParts, getDateFromParts} from '../../util/common';

@Component({
  selector: 'ngx-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => StartComponent), multi: true}]
})
export class StartComponent implements OnInit, ControlValueAccessor {
  @Output() onChange = new EventEmitter();
  public startDate;
  private propagateChange;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {

  }

  writeValue = (input: any): void => {
    this.startDate = getDateParts(new Date(input.onDate.date));
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  onFormChange = () => {
    this.propagateChange(getDateFromParts(this.startDate));
    this.onChange.emit();
  }
}
