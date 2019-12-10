import { TestBed } from '@angular/core/testing';

import { LoveService } from './love.service';

describe('LoveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoveService = TestBed.get(LoveService);
    expect(service).toBeTruthy();
  });
});
