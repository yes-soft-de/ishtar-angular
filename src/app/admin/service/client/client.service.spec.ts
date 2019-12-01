import { TestBed } from '@angular/core/testing';

import { ClientService } from './client.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('ClientService', () => {
  let clientService: ClientService;
  let httpTestController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClientService]
    });
    clientService = TestBed.get(ClientService);
    httpTestController = TestBed.get(HttpTestingController);
  });
  it('should be created', () => {
    expect(clientService).toBeTruthy();
  });
});
