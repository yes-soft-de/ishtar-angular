import { TestBed } from '@angular/core/testing';

import { UserRepoService } from './user-repo.service';

describe('UserRepoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserRepoService = TestBed.get(UserRepoService);
    expect(service).toBeTruthy();
  });
});
