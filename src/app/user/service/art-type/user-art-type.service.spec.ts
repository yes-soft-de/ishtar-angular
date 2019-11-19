import { TestBed } from '@angular/core/testing';

import { UserArtTypeService } from './user-art-type.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('UserArtTypeService', () => {
  let userArtTypeService: UserArtTypeService;
  let httpTestController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserArtTypeService]
    });
    userArtTypeService = TestBed.get(UserArtTypeService);
    httpTestController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(userArtTypeService).toBeTruthy();
  });
});
