import { TestBed } from '@angular/core/testing';

import { CommentManagerService } from './comment-manager.service';

describe('CommentManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommentManagerService = TestBed.get(CommentManagerService);
    expect(service).toBeTruthy();
  });
});
