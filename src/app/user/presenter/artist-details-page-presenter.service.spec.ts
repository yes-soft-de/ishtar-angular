import { TestBed } from '@angular/core/testing';

import { ArtistDetailsPagePresenterService } from './artist-details-page-presenter.service';

describe('ArtistDetailsPagePresenterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArtistDetailsPagePresenterService = TestBed.get(ArtistDetailsPagePresenterService);
    expect(service).toBeTruthy();
  });
});
