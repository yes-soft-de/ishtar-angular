import { TestBed } from '@angular/core/testing';

import { PaintingService } from './painting.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('PaintingService', () => {
  let paintingService: PaintingService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PaintingService]
    });
    paintingService = TestBed.get(PaintingService);
    httpTestingController = TestBed.get(HttpTestingController);
  });


  it('should be created', () => {
    expect(paintingService).toBeTruthy();
  });
});
