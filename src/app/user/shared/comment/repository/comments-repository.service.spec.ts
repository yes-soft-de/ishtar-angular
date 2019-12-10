import { TestBed } from '@angular/core/testing';

import { CommentsRepositoryService } from './comments-repository.service';

describe('CommentsRepositoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommentsRepositoryService = TestBed.get(CommentsRepositoryService);
    expect(service).toBeTruthy();
  });
});
