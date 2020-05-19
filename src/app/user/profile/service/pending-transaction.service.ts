import { Injectable } from '@angular/core';
import { PendingTransationManagerService } from '../manager/pending-transation-manager.service';
import { Observable, Subject } from 'rxjs';
import { PendingTransactionListItem } from '../../client/entity/pending-transaction-list-item';
import {OrderStatusChangeRequest} from '../request/order-status-change-request';
import {UserService} from '../../shared/user-services/service/user.service';

@Injectable({
  providedIn: 'root'
})
export class PendingTransactionService {

  constructor(private pendingTransactionsManager: PendingTransationManagerService,
              private userService: UserService) {
  }

  getPendingTransactions(): Observable<PendingTransactionListItem[]> {
    const pendingTransactionsSubject = new Subject<PendingTransactionListItem[]>();
    if (this.userService.isLoggedIn()) {
      this.pendingTransactionsManager.getPendingTransactions(this.userService.getSavedClientId()).subscribe(
        pendingTransactionResponse => {
          pendingTransactionsSubject.next(pendingTransactionResponse.Data);
        }, err => {
          console.error(err);
          pendingTransactionsSubject.error(err);
        }
      );
    } else {
      pendingTransactionsSubject.error('User Not Logged in!');
    }
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
