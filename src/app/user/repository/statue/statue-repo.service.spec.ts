import { TestBed } from '@angular/core/testing';

import { StatueRepoService } from './statue-repo.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('StatueRepoService', () => {
  let statueRepoService: StatueRepoService;
  let httpTestController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StatueRepoService]
    });
    statueRepoService = TestBed.get(StatueRepoService);
    httpTestController = TestBed.get(HttpTestingController);
  });
  it('should be created', () => {
    expect(statueRepoService).toBeTruthy();
  });
});
