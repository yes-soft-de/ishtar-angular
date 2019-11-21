import { TestBed } from '@angular/core/testing';

import { StatueCommentService } from './statue-comment.service';

describe('StatueCommentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StatueCommentService = TestBed.get(StatueCommentService);
    expect(service).toBeTruthy();
  });
});
