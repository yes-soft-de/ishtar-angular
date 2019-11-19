import { TestBed } from '@angular/core/testing';

import { ArtTypeRepoService } from './art-type-repo.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('ArtTypeRepoService', () => {
  let artTypeRepoService: ArtTypeRepoService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ArtTypeRepoService]
    });
    artTypeRepoService = TestBed.get(ArtTypeRepoService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(artTypeRepoService).toBeTruthy();
  });
});
