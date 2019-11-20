import { Injectable } from '@angular/core';
import {EMPTY, Observable, Subject} from 'rxjs';
import {ArtistListItem} from '../entity/artist-list-item';
import {ArtistDetails} from '../entity/artist-details';
import {ArtistManagerService} from '../manager/artist-manager.service';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
/**
 * Artist Service Class For Subscribe Data And Send It To Component
 */
export class ArtistService {
  artistListSubject = new Subject<ArtistListItem[]>();
  artistDetailsSubject = new Subject<ArtistDetails>();

  constructor(private artistManagerService: ArtistManagerService) { }

  // Fetch All Artists
  getArtists(): Observable<ArtistListItem[]> {
    this.artistManagerService.getArtists()
      .pipe(catchError(err => {
        this.artistListSubject.error('Error Getting Data');
        return EMPTY;
      })).subscribe(
        // Send Data If Successfully Fetching
        artistListResponse => this.artistListSubject.next(artistListResponse.Data)
    );
    // Return The Data To Print It In Component
    return this.artistListSubject.asObservable();
  }

  getArtist(artistId: number): Observable<ArtistDetails> {
    this.artistManagerService.getArtist(artistId)
      .pipe(catchError(err => {
        this.artistDetailsSubject.error('Error Getting Data');
        return EMPTY;
      })).subscribe(
          // Send Data If Successfully Fetching
          artistDetailResponse => this.artistDetailsSubject.next(artistDetailResponse.Data)
    );
    // Return The Data To Print It In Component
    return this.artistDetailsSubject.asObservable();
  }


}
