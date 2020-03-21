import {Injectable} from '@angular/core';
import {PendingTransactionRepositoryService} from '../repository/pending-transaction-repository.service';
import {Observable} from 'rxjs';
import {PendingTransactionResponse} from '../../client/response/pending-transaction-response';
import {CancelPendingTransactionResponse} from '../response/cancel-pending-transaction-response';
import {OrderStatusChangeRequest} from '../request/order-status-change-request';

@Injectable({
  providedIn: 'root'
})
export class PendingTransationManagerService {

  constructor(private pendingTransactionsRepo: PendingTransactionRepositoryService) {
  }

  getPendingTransactions(): Observable<PendingTransactionResponse> {
    return this.pendingTransactionsRepo.getPendingTransactions();
  }

  cancelOrder(token: string): Observable<CancelPendingTransactionResponse> {
    return this.pendingTransactionsRepo.cancelOrder(token);
  }

  confirmPayment(id: string, paymentData: OrderStatusChangeRequest) {
    return this.pendingTransactionsRepo.confirmPayment(id, paymentData);
  }
}
