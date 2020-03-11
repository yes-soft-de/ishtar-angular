import { TestBed } from '@angular/core/testing';

import { PendingTransationService } from './pending-transation.service';

describe('PendingTransationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PendingTransationService = TestBed.get(PendingTransationService);
    expect(service).toBeTruthy();
  });
});
