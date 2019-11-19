import { TestBed } from '@angular/core/testing';

import { ArtistService } from './artist.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('ArtistService', () => {
  let artistService: ArtistService;
  let httpTestController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ArtistService]
    });
    artistService = TestBed.get(ArtistService);
    httpTestController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(artistService).toBeTruthy();
  });
});
