import { TestBed } from '@angular/core/testing';

import { AuctionService } from './auction.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('AuctionService', () => {
  let auctionService: AuctionService;
  let httpTestController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuctionService]
    });
    auctionService = TestBed.get(AuctionService);
    httpTestController = TestBed.get(HttpTestingController);
  });
  it('should be created', () => {
    expect(auctionService).toBeTruthy();
  });
});
