import { TestBed } from '@angular/core/testing';

import { ArtistListService } from './artist-list.service';

describe('ArtistListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArtistListService = TestBed.get(ArtistListService);
    expect(service).toBeTruthy();
  });
});
