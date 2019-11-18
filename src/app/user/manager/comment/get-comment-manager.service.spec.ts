import { TestBed } from '@angular/core/testing';

import { GetCommentManagerService } from './get-comment-manager.service';

describe('GetCommentManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetCommentManagerService = TestBed.get(GetCommentManagerService);
    expect(service).toBeTruthy();
  });
});
