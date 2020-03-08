import { TestBed } from '@angular/core/testing';

import { CheckOutRepositoryService } from './check-out-repository.service';

describe('CheckOutRepositoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CheckOutRepositoryService = TestBed.get(CheckOutRepositoryService);
    expect(service).toBeTruthy();
  });
});
