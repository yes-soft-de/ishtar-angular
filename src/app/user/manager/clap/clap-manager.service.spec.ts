import { TestBed } from '@angular/core/testing';

import { ClapManagerService } from './clap-manager.service';

describe('ClapManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClapManagerService = TestBed.get(ClapManagerService);
    expect(service).toBeTruthy();
  });
});
