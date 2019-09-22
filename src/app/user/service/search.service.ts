import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserConfig} from '../UserConfig';
import {SearchResponse} from '../entity/search-result/search-response';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private httpclient: HttpClient) {
  }

  requestSearchResult(query: string) {
    const searchRequest: { keyword: string } = {
      keyword: query
    };

    return this.httpclient.post<SearchResponse>(UserConfig.searchAPI, JSON.stringify(searchRequest));
  }
}
