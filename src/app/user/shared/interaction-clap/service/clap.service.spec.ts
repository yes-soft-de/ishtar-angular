import { TestBed } from '@angular/core/testing';

import { ClapService } from './clap.service';

describe('ClapService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClapService = TestBed.get(ClapService);
    expect(service).toBeTruthy();
  });
});
