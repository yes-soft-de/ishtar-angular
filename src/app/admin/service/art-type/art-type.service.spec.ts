import { TestBed } from '@angular/core/testing';

import { ArtTypeService } from './art-type.service';

describe('ArtTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArtTypeService = TestBed.get(ArtTypeService);
    expect(service).toBeTruthy();
  });
});
