import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'ngx-repeat',
  templateUrl: './repeat.component.html',
  styleUrls: ['./repeat.component.css'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => RepeatComponent), multi: true }]
})
export class RepeatComponent implements OnInit, ControlValueAccessor {
  @Output() onChange = new EventEmitter();
  public form: FormGroup;
  @Input() frequency;
  private propagateChange;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      yearly: {},
      monthly: {},
      weekly: {},
      hourly: {},
      daily: {},
      interval: 1,
      frequency: 'Weekly'
    });

    this.form.valueChanges.subscribe(() => {
      this.onFormChange();
    });

    setTimeout(() => {
      this.onFormChange();
    }, 100);
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
      monthly: {
        mode: 'on',
        on: {
          day: 1
        },
        onThe: {
          which: 'First',
          day: 'Monday'
        }
      },
      weekly: {
        interval: 1,
        days: {
          mon: false,
          tue: false,
          wed: false,
          thu: false,
          fri: false,
          sat: false,
          sun: false,
        }
      },
      hourly: {
        interval: 1
      },
      daily: {
        interval: 1
      }
    });
    this.onFormChange();
  }

  writeValue = (input: any): void => {
    this.form.patchValue({ ...input, interval: input[input.frequency.toLowerCase()].interval });
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
    params[this.form.value.frequency.toLowerCase()].interval = this.form.value.interval;
    if (this.propagateChange) {
      this.propagateChange(params);
    }
    this.onChange.emit();
  }
}
