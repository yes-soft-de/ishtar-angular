import { TestBed } from '@angular/core/testing';

import { CommentRepoService } from './comment-repo.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('CommentRepoService', () => {
  let commentRepoService: CommentRepoService;
  let httpTestController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CommentRepoService]
    });
    commentRepoService = TestBed.get(CommentRepoService);
    httpTestController = TestBed.get(HttpTestingController);
  });
  it('should be created', () => {
    expect(commentRepoService).toBeTruthy();
  });
});
