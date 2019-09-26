import { TestBed } from '@angular/core/testing';

import { PaintingViewsService } from './painting-views.service';

describe('PaintingViewsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaintingViewsService = TestBed.get(PaintingViewsService);
    expect(service).toBeTruthy();
  });
});
