import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {PaintingObject} from '../../entity-protected/painting/painting-object';
import {PaintingRepoService} from '../../repository/painting/painting-repo.service';
import {StatueObject} from '../../entity-protected/statue/statue-object';
import {StatueRepoService} from '../../repository/statue/statue-repo.service';

@Injectable({
  providedIn: 'root'
})
export class StatueManagerService {

  managerObjectSubject: Subject<StatueObject>;
  managerListSubject: Subject<StatueObject[]>;

  constructor(private paintingRepo: StatueRepoService) {
  }

  public getAllStatues() {
    const repoListSubject = new Subject<StatueObject[]>();
    repoListSubject.asObservable().subscribe(
      data => {
        this.managerListSubject.next(data);
      }, error1 => {
        this.managerListSubject.error(error1);
      }
    );
    this.paintingRepo.getStatueList(repoListSubject);
  }

  public getStatue(artistId: string) {
    const repoObjectSubject = new Subject<StatueObject>();
    const repoObject$ = repoObjectSubject.asObservable().subscribe(
      data => {
        this.managerObjectSubject.next(data);
      }, error1 => {
        this.managerObjectSubject.error(error1);
      }
    );
    this.paintingRepo.getStatue(artistId, repoObjectSubject);
  }

  public getDetailsObservable(): Observable<StatueObject> {
    return this.managerObjectSubject.asObservable();
  }

  public getListObservable(): Observable<StatueObject[]> {
    return this.managerListSubject.asObservable();
  }
}
