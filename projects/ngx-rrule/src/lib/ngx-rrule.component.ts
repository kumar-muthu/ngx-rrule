import {Component, forwardRef, OnInit} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'ngx-rrule',
  templateUrl: './ngx-rrule.component.html',
  styles: [],
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NgxRruleComponent), multi: true}]
})
export class NgxRruleComponent implements OnInit, ControlValueAccessor {
  public form: FormGroup;
  private propagateChange;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      repeat: {},
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
    this.propagateChange(this.form.value);
  }
}
