import {Component, EventEmitter, forwardRef, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'ngx-repeat',
  templateUrl: './repeat.component.html',
  styleUrls: ['./repeat.component.css'],
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => RepeatComponent), multi: true}]
})
export class RepeatComponent implements OnInit, ControlValueAccessor {
  @Output() onChange = new EventEmitter();
  public form: FormGroup;
  private propagateChange;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      yearly: {},
      monthly: {},
      weekly: {weeklyInterval: 1},
      hourly: {},
      daily: {},
      interval: 1,
      frequency: 'Weekly'
    });

    this.form.valueChanges.subscribe(() => {
      this.onFormChange();
    });
  }

  onOptionChange() {
    this.form.patchValue({
      yearly: {
        mode: 'on',
        on: {
          month: 'Jan',
          day: '1'
        },
        onThe: {
          which: 'First',
          day: 'Monday',
          month: 'Jan'
        }
      },
      monthly: {mode: '',
        interval: 1,
        on: {
          day: 1
        },
        onThe: {
          which:  '',
          day:  1
        }},
      weekly: {},
      hourly: {},
      daily: {},
    });
    this.onFormChange();
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
      ...this.form.value
    };
    this.propagateChange(params);
    this.onChange.emit();
  }
}
