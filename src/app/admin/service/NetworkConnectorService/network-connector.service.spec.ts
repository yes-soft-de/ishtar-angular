import { TestBed } from '@angular/core/testing';

import { NetworkConnectorService } from './network-connector.service';

describe('NetworkConnectorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NetworkConnectorService = TestBed.get(NetworkConnectorService);
    expect(service).toBeTruthy();
  });
});
