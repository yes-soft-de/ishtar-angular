import { Injectable } from '@angular/core';
import {UserConfig} from '../../UserConfig';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {InteractionsResponse} from '../response/interactions-response';
import {UserProfileService} from '../../service/client-profile/user-profile.service';
import {UserInfo} from '../../entity/user/user-info';
import {CreateClapResponse} from '../../entity/clap/create-clap-response';
import {CreateClapRequest} from '../../entity/clap/create-clap-request';

@Injectable({
  providedIn: 'root'
})
/**
 * InteractionsRepository Class is Create, Delete, Get Interactions For (Love, Follow, View, clap)
 */
export class InteractionsRepositoryService {

  constructor(private httpClient: HttpClient) { }

  // Get Interactions number(entity: artistTableNumber, row: artistId, interactionsNumber: 1 for love & 2 for follow)
  getInteractionsNumber(entity: number, row: number, interactionsNumber: number): Observable<InteractionsResponse> {
    return this.httpClient.get<InteractionsResponse>(`${UserConfig.interactionsNumberAPI}/${entity}/${row}/${interactionsNumber}`);
  }

  // Get (love, view, follow) Interaction For This Client And This (artist, painting, ..) Dependence On Client ID
  getClientInteraction(clientId: number): Observable<any> {
    return this.httpClient.get(`${UserConfig.specificClientInteractions}/${clientId}`);
  }

  // Post (love, view, follow) Interactions (entityTypeNumber = entity: artistTableNumber, entityId = row: artistId, interactionsTypeNumber = interactionsNumber: 1 for love & 2 for follow)
  postInteractions(entityTypeNumber: number, entityId: number, userId: number, interactionsTypeNumber: number): Observable<any>  {
    const request = {
      client: userId,
      row: entityId,
      entity: entityTypeNumber,
      interaction: interactionsTypeNumber
    };
    return this.httpClient.post(`${UserConfig.interactionsAPI}`, JSON.stringify(request));
  }

  // Get (clap) Interaction For This Client And This (artist, painting. ....) Dependence On Client ID
  getClientClap(clientId: number): Observable<any> {
    return this.httpClient.get(`${UserConfig.specificClientClaps}/${clientId}`);
  }

  // Post (Clap) interactions
  postClap(entityTypeNumber: number, entityId: number, clapValue: number, userId: number): Observable<any> {
    const request = {
      entity: entityTypeNumber,
      row: entityId,
      value: clapValue,
      client: userId
    };
    return this.httpClient.post(`${UserConfig.clapsAPI}`, JSON.stringify(request));
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

  // Delete Interactions
  deleteInteractions(interactionID: number): Observable<any>  {
    return this.httpClient.delete(`${UserConfig.interactionAPI}/${interactionID}`);
  }

  // Delete Clap Interactions
  deleteClap(clapID: number): Observable<any>  {
    return this.httpClient.delete(`${UserConfig.clapAPI}/${clapID}`);
  }


}
