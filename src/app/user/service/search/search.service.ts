import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserConfig} from '../../UserConfig';

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
        image: string,
        artist: string
      }[]
    }>(UserConfig.searchAPI, JSON.stringify(searchRequest));
  }
}
