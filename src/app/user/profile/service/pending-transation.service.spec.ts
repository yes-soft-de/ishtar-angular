import { TestBed } from '@angular/core/testing';

import { PendingTransactionService } from './pending-transaction.service';

describe('PendingTransationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PendingTransactionService = TestBed.get(PendingTransactionService);
    expect(service).toBeTruthy();
  });
});
