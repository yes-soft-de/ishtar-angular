import { TestBed } from '@angular/core/testing';

import { ArtTypeManagerService } from './art-type-manager.service';

describe('ArtTypeManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArtTypeManagerService = TestBed.get(ArtTypeManagerService);
    expect(service).toBeTruthy();
  });
});
