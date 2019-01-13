import { TestBed } from '@angular/core/testing';

import { SourceCodeService } from './source-code.service';

describe('SourceCodeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SourceCodeService = TestBed.get(SourceCodeService);
    expect(service).toBeTruthy();
  });
});
