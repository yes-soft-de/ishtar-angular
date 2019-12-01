import { TestBed } from '@angular/core/testing';

import { PaintingRepoService } from './painting-repo.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('PaintingRepoService', () => {
  let paintingRepoService: PaintingRepoService;
  let httpTestController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PaintingRepoService]
    });
    paintingRepoService = TestBed.get(PaintingRepoService);
    httpTestController = TestBed.get(HttpTestingController);
  });
  it('should be created', () => {
    expect(paintingRepoService).toBeTruthy();
  });
});
