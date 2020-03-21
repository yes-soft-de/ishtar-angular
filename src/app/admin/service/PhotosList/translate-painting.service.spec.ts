import { TestBed } from '@angular/core/testing';

import { TranslatePaintingService } from './translate-painting.service';

describe('TranslatePaintingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TranslatePaintingService = TestBed.get(TranslatePaintingService);
    expect(service).toBeTruthy();
  });
});
