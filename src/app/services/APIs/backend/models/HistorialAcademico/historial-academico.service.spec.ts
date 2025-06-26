import { TestBed } from '@angular/core/testing';

import { HistorialAcademicoService } from './historial-academico.service';

describe('HistorialAcademicoService', () => {
  let service: HistorialAcademicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistorialAcademicoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
