import {Component, OnInit, Output, forwardRef, EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {getDateParts} from "../../util/common";

@Component({
  selector: 'ngx-end',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.css'],
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => EndComponent), multi: true}]
})
export class EndComponent implements OnInit, ControlValueAccessor {
  @Output() onChange = new EventEmitter();
  public form: FormGroup;
  private propagateChange;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    const dateObj = new Date() ;
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate() ;
    const year = dateObj.getFullYear();
    this.form = this.formBuilder.group({
      after: 1,
      endAt: {month, day, year},
      mode: 'Never'
    });

    setTimeout(() => {
      this.form.valueChanges.subscribe(() => {
        this.onFormChange();
      });
      this.onFormChange();
    }, 100);
  }

  writeValue = (input: any): void => {
    this.form.patchValue({
      ...input,
      endAt: new Date(input.onDate.date)
    });
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  onFormChange = () => {
    const endAt = this.form.value.endAt;
    const param = {
      ...this.form.value,
      onDate: {
        date: endAt
      }
    };
    this.propagateChange(param);
    this.onChange.emit();
  }

  radioChange = (event) => {
    if (event.target.value === 'on the') {
      this.form.patchValue({
        onDay: '',
      });
    } else {
      this.form.patchValue({
        onTheWhich: '',
        onTheDay: ''
      });
    }
    this.onFormChange();
  }

  public range = (start, end) => Array.from({length: (end - start)}, (v, k) => k + start);
}
