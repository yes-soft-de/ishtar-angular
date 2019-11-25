import {Injectable} from '@angular/core';
import {StatueRepositoryService} from '../repository/statue-repository.service';
import {Observable} from 'rxjs';
import {GetStatueResponse} from '../response/get-statue-response';
import {StatueListResponse} from '../response/statue-list-response';

@Injectable({
  providedIn: 'root'
})
export class StatueManagerService {

  constructor(private statueRepository: StatueRepositoryService) {
  }

  getStatueDetails(statueId: number): Observable<GetStatueResponse> {
    return this.statueRepository.getStatueDetails(statueId);
  }

  getStatueList(): Observable<StatueListResponse> {
    return this.statueRepository.getStatueList();
  }
}
