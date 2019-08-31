import { TestBed } from '@angular/core/testing';

import { PhotosListService } from './photos-list.service';

describe('PhotosListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PhotosListService = TestBed.get(PhotosListService);
    expect(service).toBeTruthy();
  });
});
