import { TestBed } from '@angular/core/testing';

import { SearchRepositoryService } from './search-repository.service';

describe('SearchRepositoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchRepositoryService = TestBed.get(SearchRepositoryService);
    expect(service).toBeTruthy();
  });
});
