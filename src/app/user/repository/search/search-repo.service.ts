import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserConfig} from '../../UserConfig';
import {SearchResponse} from '../../entity-protected/search/search-response';
import {SearchRequest} from '../../entity-protected/search/search-request';
import {Subject} from 'rxjs';
import {SearchItem} from '../../entity-protected/search/search-item';

@Injectable({
  providedIn: 'root'
})
export class SearchRepoService {
  constructor(private httpClient: HttpClient) {
  }

  public requestSearchResult(query: string, repoEventHandler: Subject<SearchItem[]>) {
    const searchRequest: SearchRequest = {keyword: query};
    this.httpClient.post<SearchResponse>(UserConfig.searchAPI, JSON.stringify(searchRequest)).subscribe(
      data => {
        repoEventHandler.next(data.Data);
      }, error1 => {
        repoEventHandler.error('Error Getting Data From Backend: ' + error1);
      }
    );
  }
}
