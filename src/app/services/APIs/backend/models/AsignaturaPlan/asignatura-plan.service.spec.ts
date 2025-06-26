import { TestBed } from '@angular/core/testing';

import { AsignaturaPlanService } from './asignatura-plan.service';

describe('AsignaturaPlanService', () => {
  let service: AsignaturaPlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsignaturaPlanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
