import { TestBed } from '@angular/core/testing';

import { CommentPresenterService } from './comment-presenter.service';

describe('CommentPresenterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommentPresenterService = TestBed.get(CommentPresenterService);
    expect(service).toBeTruthy();
  });
});
