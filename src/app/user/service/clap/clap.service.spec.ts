import { TestBed } from '@angular/core/testing';

import { ClapService } from './clap.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('ClapService', () => {
  let clapService: ClapService;
  let httpTestController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClapService]
    });
    clapService = TestBed.get(ClapService);
    httpTestController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(clapService).toBeTruthy();
  });
});
