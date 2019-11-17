import { TestBed } from '@angular/core/testing';

import { LogoutRepoService } from './logout-repo.service';

describe('LogoutRepoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LogoutRepoService = TestBed.get(LogoutRepoService);
    expect(service).toBeTruthy();
  });
});
