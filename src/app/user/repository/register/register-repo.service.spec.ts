import { TestBed } from '@angular/core/testing';

import { RegisterRepoService } from './register-repo.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('RegisterRepoService', () => {
  let registerRepoService: RegisterRepoService;
  let httpTestController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RegisterRepoService]
    });
    registerRepoService = TestBed.get(RegisterRepoService);
    httpTestController = TestBed.get(HttpTestingController);
  });
  it('should be created', () => {
    expect(registerRepoService).toBeTruthy();
  });
});
