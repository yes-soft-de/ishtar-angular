import { TestBed } from '@angular/core/testing';

import { CommentServiceService } from './comment-service.service';

describe('CommentServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommentServiceService = TestBed.get(CommentServiceService);
    expect(service).toBeTruthy();
  });
});
