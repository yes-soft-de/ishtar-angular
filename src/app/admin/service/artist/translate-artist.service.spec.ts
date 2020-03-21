import { TestBed } from '@angular/core/testing';

import { TranslateArtistService } from './translate-artist.service';

describe('TranslateArtistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TranslateArtistService = TestBed.get(TranslateArtistService);
    expect(service).toBeTruthy();
  });
});
