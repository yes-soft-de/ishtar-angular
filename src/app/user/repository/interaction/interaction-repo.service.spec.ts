import { TestBed } from '@angular/core/testing';

import { InteractionRepoService } from './interaction-repo.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('InteractionRepoService', () => {
  let interactionRepoService: InteractionRepoService;
  let httpTestController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [InteractionRepoService]
    });
    interactionRepoService = TestBed.get(InteractionRepoService);
    httpTestController = TestBed.get(HttpTestingController);
  });
  it('should be created', () => {
    expect(interactionRepoService).toBeTruthy();
  });
});
