import { Injectable } from '@angular/core';
import { IshtarClientService } from '../../shared/client/ishtar-client.service';
import { Observable } from 'rxjs';
import { PendingTransactionResponse } from '../../client/response/pending-transaction-response';
import { UserConfig } from '../../UserConfig';
import { CancelPendingTransactionResponse } from '../response/cancel-pending-transaction-response';

@Injectable({
  providedIn: 'root'
})
export class PendingTransationRepositoryService {

  constructor(private httpClient: IshtarClientService) {
  }

  getPendingTransactions(): Observable<PendingTransactionResponse> {
    return this.httpClient.get(`${UserConfig.PendingTransactions}`);
  }

  cancelOrder(id: string): Observable<CancelPendingTransactionResponse> {
    return this.httpClient.put(`${UserConfig.CancelPendingTransactions}/${id}`, null);
  }
}
