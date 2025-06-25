import { TestBed } from '@angular/core/testing';

import { HistoricoSeguimientoService } from './historico-seguimiento.service';

describe('HistoricoSeguimientoService', () => {
  let service: HistoricoSeguimientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoricoSeguimientoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
