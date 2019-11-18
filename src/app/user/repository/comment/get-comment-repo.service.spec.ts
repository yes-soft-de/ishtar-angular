import { TestBed } from '@angular/core/testing';

import { GetCommentRepoService } from './get-comment-repo.service';

describe('GetCommentRepoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetCommentRepoService = TestBed.get(GetCommentRepoService);
    expect(service).toBeTruthy();
  });
});
