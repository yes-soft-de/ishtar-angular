import { TestBed } from '@angular/core/testing';

import { UserProfileRepoService } from './user-profile-repo.service';

describe('UserProfileRepoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserProfileRepoService = TestBed.get(UserProfileRepoService);
    expect(service).toBeTruthy();
  });
});
