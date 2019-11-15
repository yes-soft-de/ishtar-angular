import { TestBed } from '@angular/core/testing';

import { InteractionRepoService } from './interaction-repo.service';

describe('InteractionRepoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InteractionRepoService = TestBed.get(InteractionRepoService);
    expect(service).toBeTruthy();
  });
});
