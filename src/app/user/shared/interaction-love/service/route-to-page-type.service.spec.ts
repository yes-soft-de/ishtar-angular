import { TestBed } from '@angular/core/testing';

import { RouteToPageTypeService } from './route-to-page-type.service';

describe('RouteToPageTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RouteToPageTypeService = TestBed.get(RouteToPageTypeService);
    expect(service).toBeTruthy();
  });
});
