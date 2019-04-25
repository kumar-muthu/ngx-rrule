import { Injectable } from '@angular/core';
import {computeRRule} from './util/computeRRule/toString/computeRRule';
@Injectable({
  providedIn: 'root'
})
export class NgxRruleService {

  constructor() {

  }

  computeRRule(params) {
    return computeRRule(params);
  }
}
