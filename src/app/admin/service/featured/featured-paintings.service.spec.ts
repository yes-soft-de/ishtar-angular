import { TestBed } from '@angular/core/testing';

import { FeaturedPaintingsService } from './featured-paintings.service';

describe('FeaturedPaintingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FeaturedPaintingsService = TestBed.get(FeaturedPaintingsService);
    expect(service).toBeTruthy();
  });
});
