import { TestBed } from '@angular/core/testing';

import { CommentService } from './comment.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('PaintingCommentService', () => {
  let commentService: CommentService;
  let httpTestController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CommentService]
    });
    commentService = TestBed.get(CommentService);
    httpTestController = TestBed.get(HttpTestingController);
  });
  it('should be created', () => {
    expect(commentService).toBeTruthy();
  });
});
