import { TestBed } from '@angular/core/testing';

import { InteractionsRepositoryService } from './interactions-repository.service';

describe('InteractionsRepositoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InteractionsRepositoryService = TestBed.get(InteractionsRepositoryService);
    expect(service).toBeTruthy();
  });
});
