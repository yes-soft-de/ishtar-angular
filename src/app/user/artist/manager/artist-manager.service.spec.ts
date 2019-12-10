import { TestBed } from '@angular/core/testing';

import { ArtistManagerService } from './artist-manager.service';

describe('ArtistManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArtistManagerService = TestBed.get(ArtistManagerService);
    expect(service).toBeTruthy();
  });
});
