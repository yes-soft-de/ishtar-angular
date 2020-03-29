import { TestBed } from '@angular/core/testing';

import { InteractionsService } from './interactions.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('InteractionsService', () => {
  let interactionsService: InteractionsService;
  let httpTestController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [InteractionsService]
    });
    interactionsService = TestBed.get(InteractionsService);
    httpTestController = TestBed.get(HttpTestingController);
  });
  it('should be created', () => {
    expect(interactionsService).toBeTruthy();
  });
});
