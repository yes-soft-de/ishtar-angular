import {Injectable} from '@angular/core';
import {SearchRepositoryService} from '../repository/search-repository.service';
import {SearchRequest} from '../request/search-request';
import {Observable} from 'rxjs';
import {SearchResponse} from '../response/search-response';

@Injectable({
  providedIn: 'root'
})
export class SearchManagerService {

  constructor(private searchRepo: SearchRepositoryService) {
  }

  search(searchRequest: SearchRequest): Observable<SearchResponse> {
    return this.searchRepo.search(searchRequest);
  }
}
