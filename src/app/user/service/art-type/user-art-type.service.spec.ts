import { TestBed } from '@angular/core/testing';

import { UserArtTypeService } from './user-art-type.service';

describe('UserArtTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserArtTypeService = TestBed.get(UserArtTypeService);
    expect(service).toBeTruthy();
  });
});
