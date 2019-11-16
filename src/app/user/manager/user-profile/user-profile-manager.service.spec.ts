import { TestBed } from '@angular/core/testing';

import { UserProfileManagerService } from './user-profile-manager.service';

describe('UserProfileManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserProfileManagerService = TestBed.get(UserProfileManagerService);
    expect(service).toBeTruthy();
  });
});
