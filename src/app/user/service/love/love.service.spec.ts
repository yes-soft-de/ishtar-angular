import { TestBed } from '@angular/core/testing';

import { LoveService } from './love.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';

describe('LoveService', () => {
  let loveService: LoveService;
  let httpTestController: HttpTestingController;
  let dialog: MatDialog;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
          HttpClientTestingModule,
          MatDialogModule],
      providers: [
          LoveService,
          MatDialog],
    });
    loveService = TestBed.get(LoveService);
    httpTestController = TestBed.get(HttpTestingController);
    dialog = TestBed.get(MatDialog);
  });

  it('should be created', () => {
    expect(loveService).toBeTruthy();
  });
});
