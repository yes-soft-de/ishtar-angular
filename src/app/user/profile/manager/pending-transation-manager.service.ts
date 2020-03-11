import { Injectable } from '@angular/core';
import { PendingTransationRepositoryService } from '../repository/pending-transation-repository.service';
import { Observable } from 'rxjs';
import { PendingTransactionResponse } from '../../client/response/pending-transaction-response';
import { CancelPendingTransactionResponse } from '../response/cancel-pending-transaction-response';

@Injectable({
  providedIn: 'root'
})
export class PendingTransationManagerService {

  constructor(private pendingTransactionsRepo: PendingTransationRepositoryService) {
  }

  getPendingTransactions(): Observable<PendingTransactionResponse> {
    return this.pendingTransactionsRepo.getPendingTransactions();
  }

  cancelOrder(id: string): Observable<CancelPendingTransactionResponse> {
    return this.pendingTransactionsRepo.cancelOrder(id);
  }
}
