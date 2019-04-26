import {Component, OnInit, Output, forwardRef, EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';


@Component({
  selector: 'ngx-monthly',
  templateUrl: './monthly.component.html',
  styleUrls: ['./monthly.component.css'],
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => MonthlyComponent), multi: true}]
})
export class MonthlyComponent implements OnInit, ControlValueAccessor {
  @Output() onChange = new EventEmitter();
  public form: FormGroup;
  private propagateChange;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      interval: 0,
      mode: 'on',
      onDay: '1',
      onTheWhich: 'First',
      onTheDay: 'Monday'
    });

    this.form.valueChanges.subscribe(() => {
      this.onFormChange();
    });


    setTimeout(() => {
      this.onFormChange();
    }, 100);
  }

  writeValue = (input: any): void => {
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  onFormChange = () => {
    const params = {
      mode: this.form.value.mode,
      interval: this.form.value.interval,
      on: {
        day: this.form.value.onDay
      },
      onThe: {
        which:  this.form.value.onTheWhich,
        day:  this.form.value.onTheDay
      }
    }
    this.propagateChange(params);
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
