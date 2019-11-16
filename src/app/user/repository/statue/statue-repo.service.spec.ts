import { TestBed } from '@angular/core/testing';

import { StatueRepoService } from './statue-repo.service';

describe('StatueRepoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StatueRepoService = TestBed.get(StatueRepoService);
    expect(service).toBeTruthy();
  });
});
