import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../service/client.service';
import { PendingTransactionListItem } from '../../entity/pending-transaction-list-item';

@Component({
  selector: 'app-pending-transactions',
  templateUrl: './pending-transactions.component.html',
  styleUrls: ['./pending-transactions.component.scss']
})
export class PendingTransactionsComponent implements OnInit {

  pendingTransactions: PendingTransactionListItem[];

  constructor(private clientService: ClientService) { }

  ngOnInit() {
    // TODO - Change This to the Actual Request
    this.clientService.requestPendingTransactions(0).subscribe(
      transactionList => {
        this.pendingTransactions = transactionList;
      }
    );
  }

}
