import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserConfig} from '../../../UserConfig';
import {LoveResponse} from '../response/love-response';
import {LoveRequest} from '../request/love-request';

@Injectable({
  providedIn: 'root'
})
export class LoveRepositoryService {

  constructor(private httpClient: HttpClient) {
  }

  createLove(loveRequest: LoveRequest) {
    return this.httpClient.post<LoveResponse>(`${UserConfig.clapsAPI}`, JSON.stringify(loveRequest));
  }
}
