import { TestBed } from '@angular/core/testing';

import { PendingTransactionRepositoryService } from './pending-transaction-repository.service';

describe('PendingTransationRepositoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PendingTransactionRepositoryService = TestBed.get(PendingTransactionRepositoryService);
    expect(service).toBeTruthy();
  });
});
