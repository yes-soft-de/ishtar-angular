import { TestBed } from '@angular/core/testing';

import { SearchService } from './search.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('SearchService', () => {
  let searchService: SearchService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SearchService]
    });
    searchService = TestBed.get(SearchService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(searchService).toBeTruthy();
  });
});
