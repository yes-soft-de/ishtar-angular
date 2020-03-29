import { TestBed } from '@angular/core/testing';

import { PhotosListService } from './photos-list.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('PhotosListService', () => {
  let photosListService: PhotosListService;
  let httpTestController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PhotosListService]
    });
    photosListService = TestBed.get(PhotosListService);
    httpTestController = TestBed.get(HttpTestingController);
  });
  it('should be created', () => {
    expect(photosListService).toBeTruthy();
  });
});
