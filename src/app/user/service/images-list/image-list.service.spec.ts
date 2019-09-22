import { TestBed } from '@angular/core/testing';

import { ImageListService } from './image-list.service';

describe('ImageListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImageListService = TestBed.get(ImageListService);
    expect(service).toBeTruthy();
  });
});
