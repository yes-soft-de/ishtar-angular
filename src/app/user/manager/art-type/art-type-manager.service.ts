import {Injectable} from '@angular/core';
import {ArtTypeRepoService} from '../../repository/art-type/art-type-repo.service';
import {Observable, Subject} from 'rxjs';
import {ArtTypeObject} from '../../entity-protected/art-type/art-type-object';

@Injectable({
  providedIn: 'root'
})
export class ArtTypeManagerService {
  managerObjectSubject: Subject<ArtTypeObject>;
  managerListSubject: Subject<ArtTypeObject[]>;

  constructor(private artTypeRepo: ArtTypeRepoService) {
  }

  public getAllArtTypes() {
    const repoListSubject = new Subject<ArtTypeObject[]>();
    const repoList$ = repoListSubject.asObservable().subscribe(
      data => {
        this.managerListSubject.next(data);
      }, error1 => {
        this.managerListSubject.error(error1);
      }
    );
    this.artTypeRepo.getAllArtType(repoListSubject);
  }

  public getArtType(artTypeId: string) {
    const repoObjectSubject = new Subject<ArtTypeObject>();
    const repoObject$ = repoObjectSubject.asObservable().subscribe(
      data => {
        this.managerObjectSubject.next(data);
      }, error1 => {
        this.managerObjectSubject.error(error1);
      }
    );
    this.artTypeRepo.getArtType(artTypeId, repoObjectSubject);
  }

  public getDetailsObservable(): Observable<ArtTypeObject> {
    return this.managerObjectSubject.asObservable();
  }

  public getListObservable(): Observable<ArtTypeObject[]> {
    return this.managerListSubject.asObservable();
  }
}
