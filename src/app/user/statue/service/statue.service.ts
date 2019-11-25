import {Injectable} from '@angular/core';
import {StatueManagerService} from '../manager/statue-manager.service';
import {Observable, Subject} from 'rxjs';
import {StatueObject} from '../entity/statue-object';

@Injectable({
  providedIn: 'root'
})
export class StatueService {
  private statueSubject: Subject<StatueObject>;

  constructor(private statueManager: StatueManagerService) {
    this.statueSubject = new Subject<StatueObject>();
  }

  getStatueDetails(statueId: number): Observable<StatueObject> {
    this.statueManager.getStatueDetails(statueId).subscribe(
      stateDetailsResponse => {
        this.statueSubject.next(stateDetailsResponse.Data);
      }
    );
    return this.statueSubject.asObservable();
  }

  getStatueList(): Observable<StatueObject[]> {
    const listSubject = new Subject<StatueObject[]>();
    this.statueManager.getStatueList().subscribe(
      statueListResponse => {
        listSubject.next(statueListResponse.Data);
      }
    );
    return listSubject.asObservable();
  }
}
