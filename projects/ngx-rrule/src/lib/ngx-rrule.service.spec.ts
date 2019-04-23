import { TestBed } from '@angular/core/testing';

import { NgxRruleService } from './ngx-rrule.service';

describe('NgxRruleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxRruleService = TestBed.get(NgxRruleService);
    expect(service).toBeTruthy();
  });
});
