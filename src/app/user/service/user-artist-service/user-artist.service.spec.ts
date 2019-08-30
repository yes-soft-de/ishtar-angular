import { TestBed } from '@angular/core/testing';

import { UserArtistService } from './user-artist.service';

describe('UserArtistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserArtistService = TestBed.get(UserArtistService);
    expect(service).toBeTruthy();
  });
});
