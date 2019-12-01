import { TestBed } from '@angular/core/testing';

import { LoginRepoService } from './login-repo.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('LoginRepoService', () => {
  let loginRepoService: LoginRepoService;
  let httpTestController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoginRepoService]
    });
    loginRepoService = TestBed.get(LoginRepoService);
    httpTestController = TestBed.get(HttpTestingController);
  });
  it('should be created', () => {
    expect(loginRepoService).toBeTruthy();
  });
});
