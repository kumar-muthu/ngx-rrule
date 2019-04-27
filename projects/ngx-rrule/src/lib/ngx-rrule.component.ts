import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';
import {NgxRruleService} from './ngx-rrule.service';

@Component({
  selector: 'ngx-rrule',
  templateUrl: './ngx-rrule.component.html',
  styles: [],
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NgxRruleComponent), multi: true}]
})
export class NgxRruleComponent implements OnInit, ControlValueAccessor {
  @Input() hideStart = false;
  @Input() hideEnd = false;
  @Input() startAt;
  @Input() endAt;
  public form: FormGroup;
  private propagateChange;
  constructor(private formBuilder: FormBuilder,
              private  service: NgxRruleService) {}

  ngOnInit() {
    const params: any = {
      start: {},
      repeat: {},
      end: {
        mode: 'Never'
      }
    };


    if (this.endAt) {
      params.end.endAt = this.getDateParts(this.endAt);
      params.end.mode = 'On date';
    }

    if (this.startAt) {
      params.start = this.getDateParts(this.startAt);
    }

    this.form = this.formBuilder.group(params);

    this.form.valueChanges.subscribe(() => this.onFormChange());
  }

  private getDateParts(dateObj) {
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    return {month, day, year};
  }

  writeValue = (input: any): void => {
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  onFormChange = () => {
    let rRule;
    try {
      const params = this.form.value;
      if (this.hideStart && !this.startAt) {
        params.start = null;
      }
      if (this.hideEnd && !this.endAt) {
        params.end = null;
      }
      rRule = this.service.computeRRule({...params, options: {}});
    } catch (err) {
      console.error(err);
    }
    this.propagateChange({
      raw: this.form.value,
      rRule
    });
  }
}
