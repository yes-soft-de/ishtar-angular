import { TestBed } from '@angular/core/testing';

import { UserProfileRepoService } from './user-profile-repo.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {CookieService} from 'ngx-cookie-service';

describe('UserProfileRepoService', () => {
  let userProfileRepoService: UserProfileRepoService;
  let httpTestController: HttpTestingController;
  let cookieService: CookieService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
          UserProfileRepoService,
          CookieService]
    });
    userProfileRepoService = TestBed.get(UserProfileRepoService);
    httpTestController = TestBed.get(HttpTestingController);
    cookieService = TestBed.get(CookieService);
  });
  it('should be created', () => {
    expect(userProfileRepoService).toBeTruthy();
  });
});
