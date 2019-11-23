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

  // region Filters and It's Methods
  private activeArtType: string = null;
  private activeFollowerRange: number;

  private static applyArtTypeFilter(artistList: ArtistListItem[]): ArtistListItem[] {
    const filteredArtists: ArtistListItem[] = [];
    for (const artist of artistList) {
      if (artist.artType === name) {
        filteredArtists.push(artist);
      }
    }
    return filteredArtists;
  }

  private static applyActiveFollowerRangeFilter(artistList: ArtistListItem[]): ArtistListItem[] {
    // TODO Implement a Filter
    return artistList;
  }

  // endregion

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

  // Sort Method From larger FollowNumber To Smallest
  sortItemsByLargeFollowNumber() {
    this.artistList.sort(
      (a, b) => (Number(a.artistFollowers) < Number(b.artistFollowers))
        ? 1 : (Number(a.artistFollowers) === Number(b.artistFollowers))
          ? ((Number(a.artistFollowers) < Number(b.artistFollowers))
            ? 1 : -1) : -1);
    this.artistListSubject.next(this.artistList);
  }

  // Sort Method From Small FollowNumber To Biggest
  sortItemsByLowerFollowNumber() {
    this.artistList.sort(
      (a, b) => (Number(a.artistFollowers) > Number(b.artistFollowers))
        ? 1 : (Number(a.artistFollowers) === Number(b.artistFollowers))
          ? ((Number(a.artistFollowers) > Number(b.artistFollowers))
            ? 1 : -1) : -1);
    this.artistListSubject.next(this.artistList);
  }

  public filterByArtType(name: string) {
    this.activeArtType = name;
    this.calculateResultList();
  }

  public cancelFilterArtType() {
    this.activeArtType = null;
    this.calculateResultList();
  }

  public cancelFilterFollowersRange() {
    this.activeFollowerRange = null;
    this.calculateResultList();
  }

  public filterByFollowersRange(above: number) {
    this.activeFollowerRange = above;
  }

  public cancelAllFilters() {
    this.activeArtType = null;
    this.activeFollowerRange = null;
    this.artistListSubject.next(this.artistList);
  }

  private calculateResultList() {
    let finalArtistList: ArtistListItem[] = this.artistList;
    if (this.activeArtType !== null) {
      finalArtistList = ArtistService.applyArtTypeFilter(finalArtistList);
    }
    if (this.activeFollowerRange !== null) {
      finalArtistList = ArtistService.applyActiveFollowerRangeFilter(finalArtistList);
    }

    this.artistListSubject.next(finalArtistList);
  }
}
