import {Injectable} from '@angular/core';
import {InteractionsRepositoryService} from '../repository/interactions-repository.service';
import {Observable} from 'rxjs';
import {InteractionsResponse} from '../response/interactions-response';
import { ClientInteractionResponse } from '../response/client-interaction-response';
import { InteractionResponse } from 'src/app/admin/entity/interactions/interaction-response';
import { ClapGetResponse } from '../response/clap-get-response';
import { ClapEntity } from '../entity/clap-entity';

@Injectable({
  providedIn: 'root'
})
/**
 * InteractionsRepository Class Is Like a
 * Bridge Between Repository And Service
 * Interactions For (Love, Follow, View) Only
 */
export class InteractionsManagerService {

  constructor(private interactionsRepositoryService: InteractionsRepositoryService) {
  }

  /**
   * get the interactions from the API
   * @param entity <InteractionConsts.ENITITY_TYPE_PAINTING/InteractionConsts.ENITITY_TYPE_ARTIST ...>
   * @param row number
   * @param interactionsNumber <InteractionConsts.INTERACTION_TYPE_...>
   */
  getInteractionsNumber(entity: number, row: number, interactionsNumber: number): Observable<InteractionsResponse> {
    return this.interactionsRepositoryService.getInteractionsNumber(entity, row, interactionsNumber);
  }

  /**
   * posts interactions to the API
   * @param entityCode <InteractionConsts.ENITITY_TYPE_PAINTING/InteractionConsts.ENITITY_TYPE_ARTIST ...>
   * @param entityId number
   * @param userId number
   * @param interactionsType <InteractionConsts.INTERACTION_TYPE_ ...>
   */
  postInteractions(entityCode: number, entityId: number, userId: number, interactionsType: string): Observable<InteractionResponse> {
    return this.interactionsRepositoryService.postInteractions(entityCode, entityId, userId, interactionsType);
  }

  /**
   * Post (Clap) interactions
   * @param entityTypeNumber <InteractionConsts.ENITITY_TYPE_PAINTING/InteractionConsts.ENITITY_TYPE_ARTIST ...>
   * @param entityId number
   * @param clapValue number
   * @param userId number
   */
  postClap(entityTypeNumber: number, entityId: number, clapValue: number, userId: number): Observable<{Data: ClapEntity[]}> {
    return this.interactionsRepositoryService.postClap(entityTypeNumber, entityId, clapValue, userId);
  }

  /**
   * Get (love, view, follow) Interaction For This Client And This (artist, painting, ..) Dependence On Client ID
   * @param clientId number
   */
  getClientInteraction(clientId: number): Observable<ClientInteractionResponse> {
    return this.interactionsRepositoryService.getClientInteraction(clientId);
  }

  /**
   * Get (clap) Interaction For This Client And This (artist, painting. ....) Dependence On Client ID
   * @param clientId number
   */
  getClientClap(clientId: number): Observable<ClapGetResponse> {
    return this.interactionsRepositoryService.getClientClap(clientId);
  }

  /**
   * Add To Wish List Method
   * @param id number
   * @param entityType <InteractionConsts.ENITITY_TYPE_PAINTING/InteractionConsts.ENITITY_TYPE_ARTIST ...>
   */
  addToWishList(id: string, entityType: string) {
    return this.interactionsRepositoryService.addToWishList(id, entityType);
  }

  /**
   * delete interactions
   * @param interactionsId number
   */
  deleteInteractions(interactionsId: number): Observable<any> {
    return this.interactionsRepositoryService.deleteInteractions(interactionsId);
  }

  /**
   * Delete Clap Interactions
   * @param interactionsId number
   */
  deleteClap(interactionsId: number): Observable<any> {
    return this.interactionsRepositoryService.deleteClap(interactionsId);
  }
}
