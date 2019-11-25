import { TestBed } from '@angular/core/testing';

import { PaintingRepoService } from './painting-repo.service';

describe('PaintingRepoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaintingRepoService = TestBed.get(PaintingRepoService);
    expect(service).toBeTruthy();
  });
});
