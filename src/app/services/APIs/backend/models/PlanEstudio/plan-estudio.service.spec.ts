import { TestBed } from '@angular/core/testing';

import { PlanEstudioService } from './plan-estudio.service';

describe('PlanEstudioService', () => {
  let service: PlanEstudioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanEstudioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
