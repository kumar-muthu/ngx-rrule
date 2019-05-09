import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';
import {NgxRruleService} from './ngx-rrule.service';
import {computeRRule} from '../lib/util/computeRRule/fromString/computeRRule';
import * as moment_ from 'moment';
import {getDateParts} from '../lib/util/common';

const moment = moment_;
import {DATE_TIME_FORMAT} from './util/computeRRule/constant';
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
  @Input() frequency;
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
      params.end.endAt = getDateParts(this.endAt);
      params.end.mode = 'On date';
    }

    if (this.startAt) {
      params.start = getDateParts(this.startAt);
    }

    this.form = this.formBuilder.group(params);

    this.form.valueChanges.subscribe(() => setTimeout(() => {
      this.onFormChange();
    }, 100));
  }

  writeValue = (input: any): void => {
    const config: any = {};
    const configureFrequency = () => (config.repeat ? config.repeat[0] : 'Yearly');
    const configureYearly = () => (config.yearly || 'on');
    const configureMonthly = () => (config.monthly || 'on');
    const configureEnd = () => (config.end ? config.end[0] : 'Never');
    const configureHideStart = () => (typeof config.hideStart === 'undefined' ? true : config.hideStart);
    // const uniqueRruleId = isEmpty(id) ? uniqueId('rrule-') : id;
    const init_data = {
      start: {
        onDate: {
          date: moment().format(DATE_TIME_FORMAT),
          options: {},
        },
      },
      repeat: {
        frequency: configureFrequency(),
        yearly: {
          mode: configureYearly(),
          on: {
            month: 'Jan',
            day: 1,
          },
          onThe: {
            month: 'Jan',
            day: 'Monday',
            which: 'First',
          },
          options: {
            // modes: config.yearly,
          },
        },
        monthly: {
          mode: configureMonthly(),
          interval: 1,
          on: {
            day: 1,
          },
          onThe: {
            day: 'Monday',
            which: 'First',
          },
          options: {
            // modes: config.monthly,
          },
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
          },
          options: {
            // weekStartsOnSunday: config.weekStartsOnSunday,
          },
        },
        daily: {
          interval: 1,
        },
        hourly: {
          interval: 1,
        },
        options: {
          // frequency: config.repeat,
        },
      },
      end: {
        mode: configureEnd(),
        after: 1,
        onDate: {
          date: moment().format(DATE_TIME_FORMAT),
          options: {
           // weekStartsOnSunday: config.weekStartsOnSunday,
           // calendarComponent,
          },
        },
        options: {
          modes: config.end,
        },
      },
      options: {
        hideStart: configureHideStart(),
        hideEnd: config.hideEnd,
        hideError: config.hideError,
        weekStartsOnSunday: config.weekStartsOnSunday,
      },
      error: null,
    };


    const data = computeRRule(init_data, input);
    this.form.patchValue(data);
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
    if (this.propagateChange) {
      this.propagateChange({
        raw: this.form.value,
        rRule
      });
    }
  }
}
