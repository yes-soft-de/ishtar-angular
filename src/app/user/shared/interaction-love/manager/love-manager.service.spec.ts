import { TestBed } from '@angular/core/testing';

import { LoveManagerService } from './love-manager.service';

describe('LoveManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoveManagerService = TestBed.get(LoveManagerService);
    expect(service).toBeTruthy();
  });
});
