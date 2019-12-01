import { TestBed } from '@angular/core/testing';

import { ClapRepoService } from './clap-repo.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('ClapRepoService', () => {
  let clapRepoService: ClapRepoService;
  let httpTestController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClapRepoService]
    });
    clapRepoService = TestBed.get(ClapRepoService);
    httpTestController = TestBed.get(HttpTestingController);
  });
  it('should be created', () => {
    expect(clapRepoService).toBeTruthy();
  });
});
