import { TestBed } from '@angular/core/testing';

import { ArtTypeService } from './art-type.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('ArtTypeService', () => {
  let artTypeService: ArtTypeService;
  let httpTestController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ArtTypeService]
    });
    artTypeService = TestBed.get(ArtTypeService);
    httpTestController = TestBed.get(HttpTestingController);
  });
  it('should be created', () => {
    expect(artTypeService).toBeTruthy();
  });
});
