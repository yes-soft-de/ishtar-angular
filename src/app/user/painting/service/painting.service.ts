import {Injectable} from '@angular/core';
import {PaintingManagerService} from '../manager/painting-manager.service';
import {PaintingDetails} from '../entity/painting-details';
import {EMPTY, Observable, Subject} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {PaintingListItem} from '../entity/painting-list-item';


@Injectable({
  providedIn: 'root'
})
/**
 * Painting Service Class For Subscribe Data And Send It To Component
 */
export class PaintingService {
  private paintingSubject = new Subject<PaintingDetails>();
  private paintingsListSubject = new Subject<PaintingListItem[]>();
  private paintingsListBySubject = new Subject<any>();

  constructor(private paintingManager: PaintingManagerService) {}

  // Fetch All Paintings
  getPaintings(): Observable<PaintingListItem[]> {
    this.paintingManager.getPaintings()
      .pipe(catchError(err => {
        this.paintingsListSubject.error('Error Getting Data');
        return EMPTY;
      })).subscribe(
      paintingListResponse => {
        // Send Data If Successfully Fetching
        this.paintingsListSubject.next(paintingListResponse.Data);
      }
    );
    // Return The Data To Print It In Component
    return this.paintingsListSubject.asObservable();
  }

  // Fetch Painting Details
  getPainting(paintingId): Observable<PaintingDetails> {
    this.paintingManager.getPainting(paintingId)
      .pipe(catchError(err => {
        this.paintingSubject.error('Error Getting Data');
        return EMPTY;
      })).subscribe(
      paintingResponse => {
        // Send Data If Successfully Fetching
        this.paintingSubject.next(paintingResponse.Data);
      }
    );
    // Return The Data To Print It In Component
    return this.paintingSubject.asObservable();
  }

  // Fetch Every Thing From Painting Table
  getPaintingListBy(param: string, value: number): Observable<any> {
    this.paintingManager.getPaintingListBy(param, value)
      .pipe(catchError(err => {
        this.paintingsListBySubject.error('Error Getting Data');
        return EMPTY;
      })).subscribe(
      paintingListByResponse => {
        this.paintingsListBySubject.next(paintingListByResponse.Data);
      }
    );
    // Return The Data To Print It In Component
    return this.paintingsListBySubject.asObservable();
  }

}
