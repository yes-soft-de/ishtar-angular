import {Injectable} from '@angular/core';
import {ArtistRepoService} from '../../repository/artist/artist-repo.service';
import {Observable, Subject} from 'rxjs';
import {ArtTypeObject} from '../../entity-protected/art-type/art-type-object';

@Injectable({
  providedIn: 'root'
})
export class ArtistManagerService {
  managerObjectSubject: Subject<ArtTypeObject>;
  managerListSubject: Subject<ArtTypeObject[]>;

  constructor(private artistRepo: ArtistRepoService) {
  }

  public getAllArtists() {
    const repoListSubject = new Subject<ArtTypeObject[]>();
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
    const repoObjectSubject = new Subject<ArtTypeObject>();
    const repoObject$ = repoObjectSubject.asObservable().subscribe(
      data => {
        this.managerObjectSubject.next(data);
      }, error1 => {
        this.managerObjectSubject.error(error1);
      }
    );
    this.artistRepo.getArtist(artistId, repoObjectSubject);
  }

  public getDetailsObservable(): Observable<ArtTypeObject> {
    return this.managerObjectSubject.asObservable();
  }

  public getListObservable(): Observable<ArtTypeObject[]> {
    return this.managerListSubject.asObservable();
  }
}
