import { TestBed } from '@angular/core/testing';

import { PlanesEstudioAcuerdosService } from './planes-estudio-acuerdos.service';

describe('PlanesEstudioAcuerdosService', () => {
  let service: PlanesEstudioAcuerdosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanesEstudioAcuerdosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
