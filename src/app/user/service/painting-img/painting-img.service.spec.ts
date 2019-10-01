import { TestBed } from '@angular/core/testing';

import { PaintingImgService } from './painting-img.service';

describe('PaintingImgService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaintingImgService = TestBed.get(PaintingImgService);
    expect(service).toBeTruthy();
  });
});
