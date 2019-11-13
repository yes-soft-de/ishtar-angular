import { TestBed } from '@angular/core/testing';

import { UploadManagerService } from './upload-manager.service';

describe('UploadManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UploadManagerService = TestBed.get(UploadManagerService);
    expect(service).toBeTruthy();
  });
});
