import { TestBed } from '@angular/core/testing';

import { StatueService } from './statue.service';

describe('StatueService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StatueService = TestBed.get(StatueService);
    expect(service).toBeTruthy();
  });
});
