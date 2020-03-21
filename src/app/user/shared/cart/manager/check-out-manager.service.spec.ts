import { TestBed } from '@angular/core/testing';

import { CheckOutManagerService } from './check-out-manager.service';

describe('CheckOutManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CheckOutManagerService = TestBed.get(CheckOutManagerService);
    expect(service).toBeTruthy();
  });
});
