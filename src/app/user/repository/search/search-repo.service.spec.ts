import { TestBed } from '@angular/core/testing';

import { SearchRepoService } from './search-repo.service';

describe('SearchRepoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchRepoService = TestBed.get(SearchRepoService);
    expect(service).toBeTruthy();
  });
});
