import { TestBed } from '@angular/core/testing';

import { ArtistRepoService } from './artist-repo.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('ArtistRepoService', () => {
  let artistRepoService: ArtistRepoService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ArtistRepoService]
    });
    artistRepoService = TestBed.get(ArtistRepoService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(artistRepoService).toBeTruthy();
  });
});
