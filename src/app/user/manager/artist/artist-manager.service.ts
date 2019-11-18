import {Injectable} from '@angular/core';
import {ArtistRepoService} from '../../repository/artist/artist-repo.service';
import {Observable, Subject} from 'rxjs';
import {ArtTypeObject} from '../../entity-protected/art-type/art-type-object';
import {ArtistObject} from '../../entity-protected/artist/artist-object';

@Injectable({
  providedIn: 'root'
})
export class ArtistManagerService {
  managerObjectSubject: Subject<ArtistObject>;
  managerListSubject: Subject<ArtistObject[]>;

  artistId: string;

  constructor(private artistRepo: ArtistRepoService) {
  }

  public getAllArtists() {
    const repoListSubject = new Subject<ArtistObject[]>();
    repoListSubject.asObservable().subscribe(
      data => {
        this.managerListSubject.next(data);
      }, error1 => {
        this.managerListSubject.error(error1);
      }
    );
    this.artistRepo.getArtistList(repoListSubject);
  }

  public getArtist(artistId: string) {
    this.artistId = artistId;
    const repoObjectSubject = new Subject<ArtistObject>();
    const repoObject$ = repoObjectSubject.asObservable().subscribe(
      data => {
        this.managerObjectSubject.next(data);
      }, error1 => {
        this.managerObjectSubject.error(error1);
      }
    );
    this.artistRepo.getArtist(artistId, repoObjectSubject);
  }

  public getDetailsObservable(): Observable<ArtistObject> {
    return this.managerObjectSubject.asObservable();
  }

  public getListObservable(): Observable<ArtistObject[]> {
    return this.managerListSubject.asObservable();
  }
}
