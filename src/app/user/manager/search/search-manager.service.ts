import {Injectable} from '@angular/core';
import {SearchRepoService} from '../../repository/search/search-repo.service';
import {Observable, Subject} from 'rxjs';
import {SearchItem} from '../../entity-protected/search/search-item';

@Injectable({
  providedIn: 'root'
})
export class SearchManagerService {
  private managerSubject: Subject<SearchItem[]>;

  constructor(private searchRepo: SearchRepoService) {
  }

  requestSearch(keyword: string) {
    const searchRepoSubject = new Subject<SearchItem[]>();
    const repo$ = searchRepoSubject.asObservable();

    repo$.subscribe(
      data => {
        this.managerSubject.next(data);
      }, error1 => {
        this.managerSubject.error(error1);
      }
    );

    this.searchRepo.requestSearchResult(keyword, searchRepoSubject);
  }

  public getSearchObservable(): Observable<SearchItem[]> {
    return this.managerSubject.asObservable();
  }
}
