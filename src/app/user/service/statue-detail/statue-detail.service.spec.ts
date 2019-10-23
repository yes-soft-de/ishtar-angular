import { TestBed } from '@angular/core/testing';

import { StatueDetailService } from './statue-detail.service';

describe('StatueDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StatueDetailService = TestBed.get(StatueDetailService);
    expect(service).toBeTruthy();
  });
});
