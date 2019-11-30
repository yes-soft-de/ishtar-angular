import { TestBed } from '@angular/core/testing';

import { PageTypeToNumberService } from './page-type-to-number.service';

describe('PageTypeToNumberService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PageTypeToNumberService = TestBed.get(PageTypeToNumberService);
    expect(service).toBeTruthy();
  });
});
