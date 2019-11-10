import { TestBed } from '@angular/core/testing';

import { LoginRepoService } from './login-repo.service';

describe('LoginRepoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginRepoService = TestBed.get(LoginRepoService);
    expect(service).toBeTruthy();
  });
});
