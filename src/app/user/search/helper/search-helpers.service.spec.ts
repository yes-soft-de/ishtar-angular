import { TestBed } from '@angular/core/testing';

import { SearchHelpersService } from './search-helpers.service';

describe('SearchHelpersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchHelpersService = TestBed.get(SearchHelpersService);
    expect(service).toBeTruthy();
  });
});
