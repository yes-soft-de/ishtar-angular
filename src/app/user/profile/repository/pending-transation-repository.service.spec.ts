import { TestBed } from '@angular/core/testing';

import { PendingTransationRepositoryService } from './pending-transation-repository.service';

describe('PendingTransationRepositoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PendingTransationRepositoryService = TestBed.get(PendingTransationRepositoryService);
    expect(service).toBeTruthy();
  });
});
