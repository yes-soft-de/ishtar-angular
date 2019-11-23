import {Injectable} from '@angular/core';
import {LoveRepositoryService} from '../repository/love-repository.service';
import {LoveRequest} from '../request/love-request';

@Injectable({
  providedIn: 'root'
})
export class LoveManagerService {

  constructor(private loveRepository: LoveRepositoryService) {
  }

  createLove(loveRequest: LoveRequest) {
    this.loveRepository.createLove(loveRequest);
  }
}
