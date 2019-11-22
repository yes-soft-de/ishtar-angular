import { TestBed } from '@angular/core/testing';

import { StatueService } from './statue.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('StatueService', () => {
  let statueService: StatueService;
  let httpTestController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StatueService]
    });
    statueService = TestBed.get(StatueService);
    httpTestController = TestBed.get(HttpTestingController);
  });
  it('should be created', () => {
    expect(statueService).toBeTruthy();
  });
});
