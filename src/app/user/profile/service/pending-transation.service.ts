import { Injectable } from '@angular/core';
import { PendingTransationManagerService } from '../manager/pending-transation-manager.service';
import { Observable, Subject } from 'rxjs';
import { PendingTransactionListItem } from '../../client/entity/pending-transaction-list-item';

@Injectable({
  providedIn: 'root'
})
export class PendingTransationService {

  constructor(private pendingTransactionsManager: PendingTransationManagerService) {
  }

  getPendingTransactions(): Observable<PendingTransactionListItem[]> {
    const pendingTransactionsSubject = new Subject<PendingTransactionListItem[]>();
    this.pendingTransactionsManager.getPendingTransactions().subscribe(
      pendingTransactionResponse => {
        pendingTransactionsSubject.next(pendingTransactionResponse.Data);
      }, err => {
        console.error(err);
        pendingTransactionsSubject.error(err);
      }
    );
    return pendingTransactionsSubject.asObservable();
  }

  cancelPendingTransaction(id: string): Observable<boolean> {
    const ordersRequestSubject = new Subject<boolean>();
    this.pendingTransactionsManager.cancelOrder(id).subscribe(
      () => {
        ordersRequestSubject.next(true);
      }, err => {
        console.error(err);
        ordersRequestSubject.error(err);
      }
    );
    return ordersRequestSubject.asObservable();
  }
}
