import { Injectable } from '@angular/core';
import { IshtarClientService } from '../../client/ishtar-client.service';
import { Observable } from 'rxjs';
import { LoveResponse } from '../response/love-response';
import { UserConfig } from 'src/app/user/UserConfig';
import { InteractionConsts } from 'src/app/user/interactions/statics/interaction-consts';

@Injectable({
  providedIn: 'root'
})
export class LoveRepositoryService {

  constructor(private ishtarClient: IshtarClientService) { }

  getLoveInteraction(clientId: number, paintingId: number): Observable<LoveResponse> {
    return this.ishtarClient.get(`${UserConfig.interactionsAPI}/${clientId}/${paintingId}/${InteractionConsts.INTERACTION_TYPE_LOVE}`);
  }
}
