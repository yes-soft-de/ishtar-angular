import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaintingDetailsResponse } from '../response/painting-details-response';
import { catchError } from 'rxjs/operators';
import { EMPTY, Subject } from 'rxjs';
import { PaintingDetails } from '../../entity/painting-details/painting-details';

@Injectable({
  providedIn: 'root'
})
export class PaintingRepositoryService {
  repoSubject: Subject<PaintingDetails>;

  constructor(private httpClient: HttpClient) { }

  getPainting(paintingId: number) {
    this.httpClient.get<PaintingDetailsResponse>(`http://dev-ishtar.96.lt/ishtar-backend/public/painting/${paintingId}`)
    .pipe(catchError(err => {
      console.log(this.repoSubject.error(err));
      return EMPTY;
    })).subscribe(
      data => {
        this.repoSubject.next(data.Data);
      }
    );
    return this.repoSubject;
  }
}
