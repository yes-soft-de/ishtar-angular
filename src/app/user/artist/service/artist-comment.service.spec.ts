import { TestBed } from '@angular/core/testing';

import { ArtistCommentService } from './artist-comment.service';

describe('ArtistCommentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArtistCommentService = TestBed.get(ArtistCommentService);
    expect(service).toBeTruthy();
  });
});
