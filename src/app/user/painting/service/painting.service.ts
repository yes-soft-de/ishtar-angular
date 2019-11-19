import {Injectable} from '@angular/core';
import {PaintingManagerService} from '../manager/painting-manager.service';
import {PaintingDetails} from '../entity/painting-details';
import {Observable, Subject} from 'rxjs';
import {PaintingDetailsResponse} from '../response/painting-details-response';

@Injectable({
  providedIn: 'root'
})
export class PaintingService {
  private serviceSubject: Subject<PaintingDetails>;

  constructor(private paintingManager: PaintingManagerService) {
  }

  getPainting(paintingId): Observable<PaintingDetails> {
    this.paintingManager.getPainting(paintingId).subscribe(
      paintingResponse => {
        this.serviceSubject.next(paintingResponse.Data);
      }
    );

    return this.serviceSubject.asObservable();
  }
}
