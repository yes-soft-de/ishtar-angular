import { TestBed } from '@angular/core/testing';

import { UploadRepoService } from './upload-repo.service';

describe('UploadRepoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UploadRepoService = TestBed.get(UploadRepoService);
    expect(service).toBeTruthy();
  });
});
