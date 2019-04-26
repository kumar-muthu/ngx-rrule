import {Component, OnInit, Output, forwardRef, EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'ngx-yearly',
  templateUrl: './yearly.component.html',
  styleUrls: ['./yearly.component.css'],
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => YearlyComponent), multi: true}]
})
export class YearlyComponent implements OnInit, ControlValueAccessor {
  @Output() onChange = new EventEmitter();
  public form: FormGroup;
  private propagateChange;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      mode: 'on',
      onDay: '1',
      onMonth: 'Jan',
      onTheWhich: 'First',
      onTheDay: 'Monday',
      onTheMonth: 'Jan'
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
    const param = {
      mode: this.form.value.mode,
      on: {
        month: this.form.value.onMonth,
        day: this.form.value.onDay
      },
      onThe: {
        which: this.form.value.onTheWhich,
        day: this.form.value.onTheDay,
        month: this.form.value.onTheMonth
      }
    };
    this.propagateChange(param);
    this.onChange.emit();
  }

  public range = (start, end) => Array.from({length: (end - start)}, (v, k) => k + start);
}
