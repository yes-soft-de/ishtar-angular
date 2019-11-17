import { TestBed } from '@angular/core/testing';

import { CommentRepoService } from './comment-repo.service';

describe('CommentRepoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommentRepoService = TestBed.get(CommentRepoService);
    expect(service).toBeTruthy();
  });
});
