import {Injectable} from '@angular/core';
import {SearchManagerService} from '../manager/search-manager.service';
import {SearchRequest} from '../request/search-request';
import {Observable, Subject} from 'rxjs';
import {SearchListItem} from '../entity/search-list-item';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private searchManger: SearchManagerService) {
  }

  search(keywords: string): Observable<SearchListItem[]> {
    const subject = new Subject<SearchListItem[]>();
    const searchReq: SearchRequest = {
      keyword: keywords
    };
    this.searchManger.search(searchReq).subscribe(
      searchResult => {
        subject.next(searchResult.Data);
      }
    );
    return subject.asObservable();
  }
}
