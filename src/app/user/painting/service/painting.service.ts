import {Injectable} from '@angular/core';
import {PaintingManagerService} from '../manager/painting-manager.service';
import {PaintingDetails} from '../entity/painting-details';
import {EMPTY, Observable, Subject} from 'rxjs';
import {PaintingDetailsResponse} from '../response/painting-details-response';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaintingService {
  private serviceSubject: Subject<PaintingDetails>;

  constructor(private paintingManager: PaintingManagerService) {
  }

  getPainting(paintingId): Observable<PaintingDetails> {
    this.paintingManager.getPainting(paintingId)
      .pipe(catchError(err => {
        this.serviceSubject.error('Error Getting Data');
        return EMPTY;
      }))
      .subscribe(
      paintingResponse => {
        this.serviceSubject.next(paintingResponse.Data);
      }
    );

    return this.serviceSubject.asObservable();
  }
}
