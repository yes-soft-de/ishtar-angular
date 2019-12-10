import { TestBed } from '@angular/core/testing';

import { PaintingCommentService } from './painting-comment.service';

describe('PaintingCommentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaintingCommentService = TestBed.get(PaintingCommentService);
    expect(service).toBeTruthy();
  });
});
