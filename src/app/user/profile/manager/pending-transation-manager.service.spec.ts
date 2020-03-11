import { TestBed } from '@angular/core/testing';

import { PendingTransationManagerService } from './pending-transation-manager.service';

describe('PendingTransationManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PendingTransationManagerService = TestBed.get(PendingTransationManagerService);
    expect(service).toBeTruthy();
  });
});
