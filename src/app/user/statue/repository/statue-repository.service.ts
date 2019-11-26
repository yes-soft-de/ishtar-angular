import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StatueListResponse} from '../../entity-protected/statue/statue-list-response';
import {UserConfig} from '../../UserConfig';
import {Observable} from 'rxjs';
import {StatueObject} from '../entity/statue-object';
import {GetStatueResponse} from '../response/get-statue-response';

@Injectable({
  providedIn: 'root'
})
export class StatueRepositoryService {

  constructor(private httpClient: HttpClient) {
  }

  getStatueDetails(stateId: number): Observable<GetStatueResponse> {
    return this.httpClient.get<GetStatueResponse>(`${UserConfig.statueAPI}/${stateId}`);
  }
}
