import { TestBed } from '@angular/core/testing';

import { RegisterRepoService } from './register-repo.service';

describe('RegisterRepoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegisterRepoService = TestBed.get(RegisterRepoService);
    expect(service).toBeTruthy();
  });
});
