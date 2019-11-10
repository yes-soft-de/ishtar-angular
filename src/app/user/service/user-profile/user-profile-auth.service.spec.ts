import { TestBed } from '@angular/core/testing';

import { UserProfileAuthService } from './user-profile-auth.service';

describe('UserProfileAuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserProfileAuthService = TestBed.get(UserProfileAuthService);
    expect(service).toBeTruthy();
  });
});
