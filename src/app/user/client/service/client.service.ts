import { Injectable } from '@angular/core';
import { ClientManagerService } from '../manager/client-manager.service';
import { Observable, Subject } from 'rxjs';
import { PendingTransactionListItem } from '../entity/pending-transaction-list-item';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private clientManager: ClientManagerService) { }

  requestPendingTransactions(clientId: number): Observable<PendingTransactionListItem[]> {
    const transactionsSubject = new Subject<PendingTransactionListItem[]>();
    this.clientManager.requestPendingTransactions().subscribe(
      transactionsResponse => {
        transactionsSubject.next(transactionsResponse.Data);
      }
    );
    return transactionsSubject.asObservable();
  }
}
