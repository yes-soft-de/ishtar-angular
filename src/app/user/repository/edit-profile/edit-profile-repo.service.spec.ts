import { TestBed } from '@angular/core/testing';

import { EditProfileRepoService } from './edit-profile-repo.service';

describe('EditProfileRepoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditProfileRepoService = TestBed.get(EditProfileRepoService);
    expect(service).toBeTruthy();
  });
});
