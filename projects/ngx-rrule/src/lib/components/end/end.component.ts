import {Component, OnInit, Output, forwardRef, EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

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
    this.form = this.formBuilder.group({
      after: 1,
      endAt: '',
      mode: 'Never'
    });

    this.form.valueChanges.subscribe(() => {
      this.onFormChange();
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
    const param = { ...this.form.value, date: this.form.value.endAt };
    this.propagateChange(this.form.value);
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
