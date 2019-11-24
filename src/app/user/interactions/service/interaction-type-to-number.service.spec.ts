import { TestBed } from '@angular/core/testing';

import { InteractionTypeToNumberService } from './interaction-type-to-number.service';

describe('InteractionTypeToNumberService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InteractionTypeToNumberService = TestBed.get(InteractionTypeToNumberService);
    expect(service).toBeTruthy();
  });
});
