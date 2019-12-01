import { TestBed } from '@angular/core/testing';

import { LogoutRepoService } from './logout-repo.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('LogoutRepoService', () => {
  let logoutRepoService: LogoutRepoService;
  let httpTestController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LogoutRepoService]
    });
    logoutRepoService = TestBed.get(LogoutRepoService);
    httpTestController = TestBed.get(HttpTestingController);
  });
  it('should be created', () => {
    expect(logoutRepoService).toBeTruthy();
  });
});
