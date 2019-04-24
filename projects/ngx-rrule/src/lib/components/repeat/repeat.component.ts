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
  public frequency = 'Weekly';
  public form: FormGroup;
  private propagateChange;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      weekly: {},
      hourly: {},
      daily: {},
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
    console.log(this.form.value);
    this.propagateChange(this.form.value);
    this.onChange.emit();
  }
}
