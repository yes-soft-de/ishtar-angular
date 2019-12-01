import { TestBed } from '@angular/core/testing';

import { SearchManagerService } from './search-manager.service';

describe('SearchManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchManagerService = TestBed.get(SearchManagerService);
    expect(service).toBeTruthy();
  });
});
