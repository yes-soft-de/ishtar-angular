import { TestBed } from '@angular/core/testing';

import { InteractionConstantService } from './interaction-constant.service';

describe('InteractionConstantService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InteractionConstantService = TestBed.get(InteractionConstantService);
    expect(service).toBeTruthy();
  });
});
