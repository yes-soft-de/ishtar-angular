import { TestBed } from '@angular/core/testing';

import { PaintingManagerService } from './painting-manager.service';

describe('PaintingManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaintingManagerService = TestBed.get(PaintingManagerService);
    expect(service).toBeTruthy();
  });
});
