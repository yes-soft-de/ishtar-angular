import { TestBed } from '@angular/core/testing';

import { EditUserProfileManagerService } from './edit-user-profile-manager.service';

describe('EditUserProfileManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditUserProfileManagerService = TestBed.get(EditUserProfileManagerService);
    expect(service).toBeTruthy();
  });
});
