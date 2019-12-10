import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SearchRequest} from '../request/search-request';
import {Observable} from 'rxjs';
import {SearchResponse} from '../response/search-response';
import {UserConfig} from '../../UserConfig';

@Injectable({
  providedIn: 'root'
})
export class SearchRepositoryService {

  constructor(private httpClient: HttpClient) {
  }

  search(searchRequest: SearchRequest): Observable<SearchResponse> {
    return this.httpClient.post<SearchResponse>(UserConfig.searchAPI, JSON.stringify(searchRequest));
  }
}
