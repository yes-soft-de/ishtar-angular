import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ArtTypeObject} from '../../entity-protected/art-type/art-type-object';
import {PaintingRepoService} from '../../repository/painting/painting-repo.service';
import {PaintingObject} from '../../entity-protected/painting/painting-object';

@Injectable({
  providedIn: 'root'
})
export class PaintingManagerService {
  managerObjectSubject: Subject<PaintingObject>;
  managerListSubject: Subject<PaintingObject[]>;

  constructor(private paintingRepo: PaintingRepoService) {
  }

  public getAllPaintings() {
    const repoListSubject = new Subject<PaintingObject[]>();
    repoListSubject.asObservable().subscribe(
      data => {
        this.managerListSubject.next(data);
      }, error1 => {
        this.managerListSubject.error(error1);
      }
    );
    this.paintingRepo.getPaintingList(repoListSubject);
  }

  public getPainting(artistId: string) {
    const repoObjectSubject = new Subject<PaintingObject>();
    const repoObject$ = repoObjectSubject.asObservable().subscribe(
      data => {
        this.managerObjectSubject.next(data);
      }, error1 => {
        this.managerObjectSubject.error(error1);
      }
    );
    this.paintingRepo.getPainting(artistId, repoObjectSubject);
  }

  public getPaintingByArtistId(artistId: string) {
    const repoObjectSubject = new Subject<PaintingObject>();
    const repoObject$ = repoObjectSubject.asObservable().subscribe(
      data => {
        this.managerObjectSubject.next(data);
      }, error1 => {
        this.managerObjectSubject.error(error1);
      }
    );
    this.paintingRepo.getPaintingByArtist(artistId, repoObjectSubject);
  }

  public getDetailsObservable(): Observable<PaintingObject> {
    return this.managerObjectSubject.asObservable();
  }

  public getListObservable(): Observable<PaintingObject[]> {
    return this.managerListSubject.asObservable();
  }
}
