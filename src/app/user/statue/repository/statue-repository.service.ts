import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserConfig} from '../../UserConfig';
import {Observable} from 'rxjs';
import {GetStatueResponse} from '../response/get-statue-response';
import {StatueListResponse} from '../response/statue-list-response';

@Injectable({
  providedIn: 'root'
})
export class StatueRepositoryService {

  constructor(private httpClient: HttpClient) {
  }

  getStatueDetails(stateId: number): Observable<GetStatueResponse> {
    return this.httpClient.get<GetStatueResponse>(`${UserConfig.statueAPI}/${stateId}`);
  }

  getStatueList(): Observable<StatueListResponse> {
    return this.httpClient.get<StatueListResponse>(`${UserConfig.statuesAPI}`);
  }
}
