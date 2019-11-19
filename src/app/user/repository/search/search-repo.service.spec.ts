import { TestBed } from '@angular/core/testing';

import { SearchRepoService } from './search-repo.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('SearchRepoService', () => {
  let searchRepoService: SearchRepoService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SearchRepoService]
    });
    searchRepoService = TestBed.get(SearchRepoService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(searchRepoService).toBeTruthy();
  });
});
