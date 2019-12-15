import { TestBed } from '@angular/core/testing';

import { InteractionsManagerService } from './interactions-manager.service';

describe('InteractionsManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InteractionsManagerService = TestBed.get(InteractionsManagerService);
    expect(service).toBeTruthy();
  });
});
