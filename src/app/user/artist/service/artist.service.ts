import {Injectable} from '@angular/core';
import {EMPTY, Observable, Subject} from 'rxjs';
import {ArtistListItem} from '../entity/artist-list-item';
import {ArtistDetails} from '../entity/artist-details';
import {ArtistManagerService} from '../manager/artist-manager.service';
import {catchError} from 'rxjs/operators';
import {ArtistObject} from '../../entity-protected/artist/artist-object';

@Injectable({
  providedIn: 'root'
})
/**
 * Artist Service Class For Subscribe Data And Send It To Component
 */
export class ArtistService {

  constructor(private artistManagerService: ArtistManagerService) {
  }

  private artistListSubject = new Subject<ArtistListItem[]>();
  private artistDetailsSubject = new Subject<ArtistDetails>();

  private artistList: ArtistListItem[];

  // region Fetch All Artists
  getArtistList(): Observable<ArtistListItem[]> {
    this.artistManagerService.getArtists()
      .pipe(catchError(err => {
        this.artistListSubject.error('Error Getting Data');
        return EMPTY;
      })).subscribe(
      // Send Data If Successfully Fetching
      artistListResponse => {
        this.artistList = artistListResponse.Data;

        // Send the Data
        this.artistListSubject.next(this.artistList);
      }
    );
    // Return The Data To Print It In Component
    return this.artistListSubject.asObservable();
  }

  // endregion

  // region
  getArtist(artistId: number): Observable<ArtistDetails> {
    this.artistManagerService.getArtist(artistId)
      .pipe(catchError(err => {
        this.artistDetailsSubject.error('Error Getting Data');
        return EMPTY;
      })).subscribe(
      // Send Data If Successfully Fetching
      artistDetailResponse => {
        this.artistDetailsSubject.next(artistDetailResponse.Data);
      }
    );
    // Return The Data To Print It In Component
    return this.artistDetailsSubject.asObservable();
  }

  // endregion
}
