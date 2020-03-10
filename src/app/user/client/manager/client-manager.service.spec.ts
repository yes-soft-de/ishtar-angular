import { TestBed } from '@angular/core/testing';

import { ClientManagerService } from './client-manager.service';

describe('ClientManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClientManagerService = TestBed.get(ClientManagerService);
    expect(service).toBeTruthy();
  });
});
