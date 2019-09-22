import { TestBed } from '@angular/core/testing';

import { PaintingListService } from './painting-list.service';

describe('PaintingListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaintingListService = TestBed.get(PaintingListService);
    expect(service).toBeTruthy();
  });
});
