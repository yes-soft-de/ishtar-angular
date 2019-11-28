import { TestBed } from '@angular/core/testing';

import { PaintingFilterService } from './painting-filter.service';

describe('PaintingFilterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaintingFilterService = TestBed.get(PaintingFilterService);
    expect(service).toBeTruthy();
  });
});
