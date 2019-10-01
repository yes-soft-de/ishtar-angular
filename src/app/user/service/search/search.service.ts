import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserConfig} from '../../UserConfig';
import {SearchResponse} from '../../entity/search-result/search-response';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private httpClient: HttpClient) {
  }

  requestSearchResult(query: string) {
    const searchRequest: { keyword: string } = {
      keyword: query
    };

    return this.httpClient.post<{
      Data: {
        id: string,
        name: string,
        path: string,
        artist: string
      }[]
    }>(UserConfig.searchAPI, JSON.stringify(searchRequest));
  }
}
