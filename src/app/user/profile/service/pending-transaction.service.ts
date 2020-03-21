import { Injectable } from '@angular/core';
import { PendingTransationManagerService } from '../manager/pending-transation-manager.service';
import { Observable, Subject } from 'rxjs';
import { PendingTransactionListItem } from '../../client/entity/pending-transaction-list-item';
import {OrderStatusChangeRequest} from '../request/order-status-change-request';

@Injectable({
  providedIn: 'root'
})
export class PendingTransactionService {

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

  cancelPendingTransaction(token: string): Observable<boolean> {
    const ordersRequestSubject = new Subject<boolean>();
    this.pendingTransactionsManager.cancelOrder(token).subscribe(
      () => {
        ordersRequestSubject.next(true);
      }, err => {
        console.error(err);
        ordersRequestSubject.error(err);
      }
    );
    return ordersRequestSubject.asObservable();
  }

  confirmPayment(id: string, paymentData: OrderStatusChangeRequest): Observable<boolean> {
    const confirmRequestSubject = new Subject<boolean>();
    this.pendingTransactionsManager.confirmPayment(id, paymentData).subscribe(
      confirmResponse => {
        if (confirmResponse) {
          confirmRequestSubject.next(true);
        }
      }
    );
    return confirmRequestSubject.asObservable();
  }
}
