import { TestBed } from '@angular/core/testing';

import { LoveRepositoryService } from './love-repository.service';

describe('LoveRepositoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoveRepositoryService = TestBed.get(LoveRepositoryService);
    expect(service).toBeTruthy();
  });
});
