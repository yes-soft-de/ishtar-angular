import { TestBed } from '@angular/core/testing';

import { StatueRepositoryService } from './statue-repository.service';

describe('StatueRepositoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StatueRepositoryService = TestBed.get(StatueRepositoryService);
    expect(service).toBeTruthy();
  });
});
