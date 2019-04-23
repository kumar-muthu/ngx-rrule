import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxRruleComponent } from './ngx-rrule.component';

describe('NgxRruleComponent', () => {
  let component: NgxRruleComponent;
  let fixture: ComponentFixture<NgxRruleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxRruleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxRruleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
