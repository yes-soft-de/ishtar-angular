import { TestBed } from '@angular/core/testing';

import { ClapRepoService } from './clap-repo.service';

describe('ClapRepoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClapRepoService = TestBed.get(ClapRepoService);
    expect(service).toBeTruthy();
  });
});
