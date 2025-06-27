import { TestBed } from '@angular/core/testing';

import { LoadFileService } from './load-file.service';

describe('LoadFileService', () => {
  let service: LoadFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
