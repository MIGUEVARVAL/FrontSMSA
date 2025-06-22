import { TestBed } from '@angular/core/testing';

import { UrlBackendService } from './url-backend.service';

describe('UrlBackendService', () => {
  let service: UrlBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrlBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
