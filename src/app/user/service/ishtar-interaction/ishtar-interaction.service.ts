import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserConfig} from '../../UserConfig';
import {ViewInterface} from '../../entity/interaction/view.interface';

@Injectable({
  providedIn: 'root'
})
export class IshtarInteractionService {

  constructor(private httpClient: HttpClient) {}

  public addToWishList(id: string, entityType: string) {
    const request: {
      type: string,
      id: string
    } = {
      type: entityType,
      id: `${id}`
    };
    return this.httpClient.post(UserConfig.postInteractionAPI, JSON.stringify(request));
  }

  addViewInteraction(data: ViewInterface) {
    return this.httpClient.post(
        `${UserConfig.addInteractionAPI}`,
        JSON.stringify(data),
    {responseType: 'json'}
    );
  }

  // getInteraction(data: ViewInterface) {
  //   return this.httpClient.post(
  //       `${UserConfig.getInteractionAPI}`,
  //       JSON.stringify(data),
  //       {responseType: 'json'}
  //   );
  // }
  // Get All Interactions
  getInteraction() {
    return this.httpClient.get(UserConfig.interactionsAPI);
  }

  // Get Interactions number(entity: artistTableNumber, row: artistId, interactionsNumber: 1 for love & 2 for follow)
  getInteractionsNumber(entity: number, row: number, interactionsNumber: number) {
    return this.httpClient.get(`${UserConfig.interactionsNumberAPI}/${entity}/${row}/${interactionsNumber}`);
  }

}
