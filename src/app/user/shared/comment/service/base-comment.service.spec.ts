import { TestBed } from '@angular/core/testing';

import { BaseCommentService } from './base-comment.service';

describe('PaintingCommentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BaseCommentService = TestBed.get(BaseCommentService);
    expect(service).toBeTruthy();
  });
});
