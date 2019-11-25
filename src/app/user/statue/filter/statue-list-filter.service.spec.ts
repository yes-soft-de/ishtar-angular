import { TestBed } from '@angular/core/testing';

import { StatueListFilterService } from './statue-list-filter.service';

describe('StatueListFilterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StatueListFilterService = TestBed.get(StatueListFilterService);
    expect(service).toBeTruthy();
  });
});
