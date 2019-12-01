import { TestBed } from '@angular/core/testing';

import { PaintingRepositoryService } from './painting-repository.service';

describe('PaintingRepositoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaintingRepositoryService = TestBed.get(PaintingRepositoryService);
    expect(service).toBeTruthy();
  });
});
