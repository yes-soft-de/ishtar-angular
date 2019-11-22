import { TestBed } from '@angular/core/testing';

import { CommentsService } from './comments.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('CommentsService', () => {
  let commentsService: CommentsService;
  let httpTestController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CommentsService]
    });
    commentsService = TestBed.get(CommentsService);
    httpTestController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(commentsService).toBeTruthy();
  });
});
