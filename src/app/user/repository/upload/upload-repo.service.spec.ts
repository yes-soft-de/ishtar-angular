import { TestBed } from '@angular/core/testing';

import { UploadRepoService } from './upload-repo.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('UploadRepoService', () => {
  let uploadRepoService: UploadRepoService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UploadRepoService]
    });
    uploadRepoService = TestBed.get(UploadRepoService);
    httpTestingController = TestBed.get(HttpTestingController);
  });
  it('should be created', () => {
    expect(uploadRepoService).toBeTruthy();
  });
});
