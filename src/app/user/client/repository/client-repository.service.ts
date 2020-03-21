import { Injectable } from '@angular/core';
import { IshtarClientService } from '../../shared/client/ishtar-client.service';
import { UserConfig } from '../../UserConfig';
import { PendingTransactionResponse } from '../response/pending-transaction-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientRepositoryService {

  constructor(private httpClient: IshtarClientService) { }

  requestPendingTransactions(): Observable<PendingTransactionResponse> {
    return this.httpClient.get(`${UserConfig.artTypeAPI}`);
  }
}
