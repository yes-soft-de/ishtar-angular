import { Injectable } from '@angular/core';
import {UserConfig} from '../../UserConfig';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {InteractionsResponse} from '../response/interactions-response';
import {UserProfileService} from '../../service/client-profile/user-profile.service';
import {UserInfo} from '../../entity/user/user-info';

@Injectable({
  providedIn: 'root'
})
export class InteractionsRepositoryService {

  constructor(private httpClient: HttpClient,
              private userService: UserProfileService) { }

  // Get Interactions number(entity: artistTableNumber, row: artistId, interactionsNumber: 1 for love & 2 for follow)
  getInteractionsNumber(entity: number, row: number, interactionsNumber: number): Observable<InteractionsResponse> {
    return this.httpClient.get<InteractionsResponse>(`${UserConfig.interactionsNumberAPI}/${entity}/${row}/${interactionsNumber}`);
  }



  postViewInteractions(entityId: number, entityType: string, userInfo: UserInfo) {
    const request = {
      client: userInfo.id,
      row: entityId,
      entity: entityType,
      interaction: InteractionConsts.INTERACTION_TYPE_VIEW
    };
    return this.httpClient.post(`${UserConfig.interactionsAPI}`, JSON.stringify(request)).subscribe(
        (res: any) => {
          console.log('This Artist Was Reviewed', res);
        },
        error => {
          console.log(error);
        }
    );
  }


  addToWishList(id: string, entityType: string) {
    const request: {
      type: string,
      id: string
    } = {
      type: entityType,
      id: `${id}`
    };
    return this.httpClient.post(UserConfig.interactionsAPI, JSON.stringify(request));
  }


}
