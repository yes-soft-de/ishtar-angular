import { TestBed } from '@angular/core/testing';

import { ClientRepositoryService } from './client-repository.service';

describe('ClientRepositoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClientRepositoryService = TestBed.get(ClientRepositoryService);
    expect(service).toBeTruthy();
  });
});
