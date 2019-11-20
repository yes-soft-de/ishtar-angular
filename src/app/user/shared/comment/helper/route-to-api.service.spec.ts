import { TestBed } from '@angular/core/testing';

import { RouteToAPIService } from './route-to-api.service';

describe('RouteToAPIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RouteToAPIService = TestBed.get(RouteToAPIService);
    expect(service).toBeTruthy();
  });
});
