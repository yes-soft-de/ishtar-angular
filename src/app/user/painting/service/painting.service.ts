import {Injectable} from '@angular/core';
import {PaintingManagerService} from '../manager/painting-manager.service';
import {PaintingDetails} from '../entity/painting-details';
import {EMPTY, forkJoin, Observable, Subject} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {PaintingListItem} from '../entity/painting-list-item';
import {ArtistManagerService} from '../../artist/manager/artist-manager.service';
import {PaintingListResponse} from '../response/painting-list-response';
import {PaintingDetailsResponse} from '../response/painting-details-response';
import {ArtistListResponse} from '../../artist/response/artist-list-response';

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
  private serviceSubject = new Subject<any>();

  constructor(private paintingManager: PaintingManagerService,
              private artistManager: ArtistManagerService) {
  }

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

  // Join Every Data We Want In Same Subscribe
  getPaintingArtistData(paintingId: number) {
    // Fetch All Paintings
    const allPaintingsObservable: Observable<PaintingListResponse> = this.paintingManager.getPaintings();
    // Fetch This Painting Details
    const paintingDetailsObservable: Observable<PaintingDetailsResponse> = this.paintingManager.getPainting(paintingId);
    // Fetch All Artist To Select The Artist For This Painting
    const allArtistsObservable: Observable<ArtistListResponse> = this.artistManager.getArtists();

    // Combine Observables
    const combinedObservable = forkJoin(allPaintingsObservable, paintingDetailsObservable, allArtistsObservable);
    combinedObservable.subscribe(
      data => {
        this.serviceSubject.next(data);
      }
    );
    // Return The Data To Print It In Component
    return this.serviceSubject.asObservable();
  }
}
