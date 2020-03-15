import {Injectable} from '@angular/core';
import {IshtarClientService} from '../../shared/client/ishtar-client.service';
import {Observable} from 'rxjs';
import {PendingTransactionResponse} from '../../client/response/pending-transaction-response';
import {UserConfig} from '../../UserConfig';
import {CancelPendingTransactionResponse} from '../response/cancel-pending-transaction-response';
import {OrderStatusChangeResponse} from '../response/order-status-change-response';
import {OrderStatusChangeRequest} from '../request/order-status-change-request';

@Injectable({
  providedIn: 'root'
})
export class PendingTransactionRepositoryService {

  constructor(private httpClient: IshtarClientService) {
  }

  getPendingTransactions(): Observable<PendingTransactionResponse> {
    return this.httpClient.get(`${UserConfig.PendingTransactions}`);
  }

  cancelOrder(token: string): Observable<CancelPendingTransactionResponse> {
    return this.httpClient.put(`${UserConfig.CancelPendingTransactions}?token=${token}`, null);
  }

  confirmPayment(id: string, paymentData: OrderStatusChangeRequest): Observable<OrderStatusChangeRequest> {
    return this.httpClient.put(
      `${UserConfig.ConfirmPendingTransactions}?
      paymentId=${paymentData.paymentId}&
      token=${paymentData.token}&
      PayerID=${paymentData.PayerID}`,
      JSON.stringify(paymentData)
    );
  }
}
