import { TestBed } from '@angular/core/testing';

import { IshtarClientService } from './ishtar-client.service';

describe('IshtarClientService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IshtarClientService = TestBed.get(IshtarClientService);
    expect(service).toBeTruthy();
  });
});
