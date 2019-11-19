import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaintingDetailsResponse } from '../response/painting-details-response';
import { catchError } from 'rxjs/operators';
import { EMPTY, Subject, Observable } from 'rxjs';
import { PaintingDetails } from '../../entity/painting-details/painting-details';

@Injectable({
  providedIn: 'root'
})
export class PaintingRepositoryService {
  repoSubject: Subject<PaintingDetails>;

  constructor(private httpClient: HttpClient) { }

  getPainting(paintingId: number): Observable<PaintingDetailsResponse> {
    return this.httpClient.get<PaintingDetailsResponse>(`http://dev-ishtar.96.lt/ishtar-backend/public/painting/${paintingId}`)
  }
}
