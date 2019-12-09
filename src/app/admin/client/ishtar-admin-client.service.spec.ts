import { TestBed } from '@angular/core/testing';

import { IshtarAdminClientService } from './ishtar-admin-client.service';

describe('IshtarAdminClientService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IshtarAdminClientService = TestBed.get(IshtarAdminClientService);
    expect(service).toBeTruthy();
  });
});
