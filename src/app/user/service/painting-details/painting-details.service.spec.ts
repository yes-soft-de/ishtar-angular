import { TestBed } from '@angular/core/testing';

import { PaintingDetailsService } from './painting-details.service';

describe('PaintingDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaintingDetailsService = TestBed.get(PaintingDetailsService);
    expect(service).toBeTruthy();
  });
});
