import { TestBed } from '@angular/core/testing';

import { ArtistRepositoryService } from './artist-repository.service';

describe('ArtistRepositoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArtistRepositoryService = TestBed.get(ArtistRepositoryService);
    expect(service).toBeTruthy();
  });
});
