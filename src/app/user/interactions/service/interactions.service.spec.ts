import { TestBed } from '@angular/core/testing';

import { InteractionsService } from './interactions.service';

describe('InteractionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InteractionsService = TestBed.get(InteractionsService);
    expect(service).toBeTruthy();
  });
});
