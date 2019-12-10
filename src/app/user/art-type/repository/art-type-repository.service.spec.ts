import { TestBed } from '@angular/core/testing';

import { ArtTypeRepositoryService } from './art-type-repository.service';

describe('ArtTypeRepositoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArtTypeRepositoryService = TestBed.get(ArtTypeRepositoryService);
    expect(service).toBeTruthy();
  });
});
