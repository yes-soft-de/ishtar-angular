import { TestBed } from '@angular/core/testing';

import { EditProfileRepoService } from './edit-profile-repo.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('EditProfileRepoService', () => {
  let editProfileRepoService: EditProfileRepoService;
  let httpTestController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EditProfileRepoService]
    });
    editProfileRepoService = TestBed.get(EditProfileRepoService);
    httpTestController = TestBed.get(HttpTestingController);
  });
  it('should be created', () => {
    expect(editProfileRepoService).toBeTruthy();
  });
});
