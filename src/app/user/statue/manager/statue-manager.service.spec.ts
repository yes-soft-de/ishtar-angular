import { TestBed } from '@angular/core/testing';

import { StatueManagerService } from './statue-manager.service';

describe('StatueManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StatueManagerService = TestBed.get(StatueManagerService);
    expect(service).toBeTruthy();
  });
});
