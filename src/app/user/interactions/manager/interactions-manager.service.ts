import { Injectable } from '@angular/core';
import {InteractionsRepositoryService} from '../repository/interactions-repository.service';
import {Observable} from 'rxjs';
import {InteractionsResponse} from '../response/interactions-response';
import {UserInfo} from '../../entity/user/user-info';

@Injectable({
  providedIn: 'root'
})
/**
 * InteractionsRepository Class Is Like a Bridge Between Repository And Service Interactions For (Love, Follow, View) Only
 */
export class InteractionsManagerService {

  constructor(private interactionsRepositoryService: InteractionsRepositoryService) { }

  // Get Interactions number(entity: artistTableNumber, row: artistId, interactionsNumber: 1 for love & 2 for follow)
  getInteractionsNumber(entity: number, row: number, interactionsNumber: number): Observable<InteractionsResponse> {
    return this.interactionsRepositoryService.getInteractionsNumber(entity, row, interactionsNumber);
  }

  // Post Interactions (entityTypeNumber = entity: artistTableNumber, entityId = row: artistId, interactionsType = interactionsNumber: 1 for love & 2 for follow)
  postInteractions(entityTypeNumber: number, entityId: number, userId: number, interactionsType: number) {
    return this.interactionsRepositoryService.postInteractions(entityTypeNumber, entityId, userId, interactionsType);
  }

  // Post (Clap) interactions
  postClap(entityTypeNumber: number, entityId: number, clapValue: number, userId: number): Observable<any> {
    return this.interactionsRepositoryService.postClap(entityTypeNumber, entityId, clapValue, userId);
  }

  // Get (love, view, follow) Interaction For This Client And This (artist, painting, ..) Dependence On Client ID
  getClientInteraction(clientId: number): Observable<any> {
    return this.interactionsRepositoryService.getClientInteraction(clientId);
  }

  // Add To Wish List Method
  addToWishList(id: string, entityType: string) {
    return this.interactionsRepositoryService.addToWishList(id, entityType);
  }

  // Delete Interactions
  deleteInteractions(interactionsId: number): Observable<any> {
    return this.interactionsRepositoryService.deleteInteractions(interactionsId);
  }

  // Delete Clap Interactions
  deleteClap(interactionsId: number): Observable<any> {
    return this.interactionsRepositoryService.deleteClap(interactionsId);
  }
}
