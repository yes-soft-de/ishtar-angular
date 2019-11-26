import {Injectable} from '@angular/core';
import {StatueRepositoryService} from '../repository/statue-repository.service';
import {Observable} from 'rxjs';
import {StatueResponse} from '../../entity-protected/statue/statue-response';
import {GetStatueResponse} from '../response/get-statue-response';

@Injectable({
  providedIn: 'root'
})
export class StatueManagerService {

  constructor(private statueRepository: StatueRepositoryService) {
  }

  getStatueDetails(statueId: number): Observable<GetStatueResponse> {
    return this.statueRepository.getStatueDetails(statueId);
  }
}
