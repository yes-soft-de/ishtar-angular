import { TestBed } from '@angular/core/testing';

import { ArtTypeRepoService } from './art-type-repo.service';

describe('ArtTypeRepoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArtTypeRepoService = TestBed.get(ArtTypeRepoService);
    expect(service).toBeTruthy();
  });
});
