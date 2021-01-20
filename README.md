# NgxRrule
> Recurrence rules generator form control for Angular

> Inspired and partially forked from https://github.com/Fafruch/react-rrule-generator

[![Alpha](https://img.shields.io/badge/status-alpha-yellow.svg)](Alpha)
[![npm version](https://badge.fury.io/js/ngx-rrule.svg)](https://badge.fury.io/js/ngx-rrule)
[![LICENSE](https://img.shields.io/npm/l/express.svg)](LICENSE)

## Description

This is [Angular](https://angular.io/) form control using [Bootstrap](https://github.com/twbs/bootstrap) styling. It's built with the help of a great [rrule.js](https://github.com/jakubroztocil/rrule) library.

It also uses:
* [lodash](https://github.com/lodash/lodash)
* [moment](https://github.com/moment/moment)
* [ng-bootstrap](https://ng-bootstrap.github.io/#/components/datepicker/overview)

## Demo
https://kumar-muthu.github.io/ngx-rrule/

## Installation and Docs

#### Install
```
 $ npm i ngx-rrule @ng-bootstrap/ng-bootstrap rrule bootstrap
```

#### Import NgxRruleModule in your app:

```js
import {NgxRruleModule} from 'ngx-rrule';

@NgModule({
    imports: [NgxRruleModule]
})
export class AppModule {}
```

#### style.scss
Optionally, this can be added to styles section of angular.json
```css
@import '~bootstrap/dist/css/bootstrap.css';
```

#### app.component.html
```html
<form [formGroup]="myform">
  <ngx-rrule formControlName="testRule"
             [hideStart]="false"
             [hideEnd]="false"
             tz="America/New_York"
             [frequency]="['Daily','Monthly','Weekly', 'Yearly']"></ngx-rrule>
</form>
```

#### app.component.ts
```ts
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  myform: FormGroup;
  constructor(private formBuilder: FormBuilder) { }
  
  ngOnInit() {
    this.myform = this.formBuilder.group({
      testRule: ''
    });

    this.myform.valueChanges.subscribe(() => {
      const rRuleFormValue = this.myform.value.testRule;
      
      // Get the rrule object.
      // This is an instance of RRule. Refer to https://github.com/jakubroztocil/rrule on how to use it
      console.log(rRuleFormValue.rRule);
      
      // Optional - Raw value of the ngxRrule used internally
      console.log(rRuleFormValue.raw);
    });
  }
}

```

### Options

<table>
    <!-- why, markdown... -->
    <thead>
        <tr>
            <th>Option</th>
            <th>Description</th>
        </tr>
        <thead>
        <tbody>
            <tr>
                <td><code>hideStart</code></td>
                <td>
                    <p>(optional) Hides the start date part in the form.Defaults to <code>false</code></p>
                </td>
            </tr>
            <tr>
                <td><code>hideEnd</code></td>
                <td>
                    <p>(optional) Hides the until(end) date part in the form.Defaults to <code>false</code></p>
                </td>
            </tr>
            <tr>
                <td><code>frequency</code></td>
                <td>
                  <p>(required) One or many of the following recurrence options</p>
                  <ul>
                      <li><code>Daily</code></li>
                      <li><code>Weekly</code></li>
                      <li><code>Monthly</code></li>
                      <li><code>Yearly</code></li>
                  </ul>
                </td>
            </tr> 
            <tr>
                <td><code>tz</code></td>
                <td>
                    <p>(optional) Timezone. Defaults to local timezone</p>
                </td>
            </tr>
        </tbody>
</table>

## License 
MIT
