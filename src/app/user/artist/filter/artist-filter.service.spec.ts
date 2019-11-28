import { TestBed } from '@angular/core/testing';

import { ArtistFilterService } from './artist-filter.service';

describe('ArtistFilterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArtistFilterService = TestBed.get(ArtistFilterService);
    expect(service).toBeTruthy();
  });
});
