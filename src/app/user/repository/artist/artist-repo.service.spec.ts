import { TestBed } from '@angular/core/testing';

import { ArtistRepoService } from './artist-repo.service';

describe('ArtistRepoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArtistRepoService = TestBed.get(ArtistRepoService);
    expect(service).toBeTruthy();
  });
});
