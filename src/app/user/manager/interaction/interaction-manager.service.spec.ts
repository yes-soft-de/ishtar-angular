import { TestBed } from '@angular/core/testing';

import { InteractionManagerService } from './interaction-manager.service';

describe('InteractionManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InteractionManagerService = TestBed.get(InteractionManagerService);
    expect(service).toBeTruthy();
  });
});
