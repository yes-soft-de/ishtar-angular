import { Component, OnInit } from '@angular/core';
import { PendingTransationService } from '../../service/pending-transation.service';
import { PendingTransactionListItem } from 'src/app/user/client/entity/pending-transaction-list-item';

@Component({
  selector: 'app-pending-transactions',
  templateUrl: './pending-transactions.component.html',
  styleUrls: ['./pending-transactions.component.scss']
})
export class PendingTransactionsComponent implements OnInit {

  orders: PendingTransactionListItem[];

  constructor(private pendingTransactionsService: PendingTransationService) { }

  ngOnInit() {
    this.fetchOrders();
  }

  fetchOrders() {
    this.pendingTransactionsService.getPendingTransactions().subscribe(
      ordersList => {
        this.orders = ordersList;
      }
    );
  }

  cancelOrder(id: string) {
    this.pendingTransactionsService.cancelPendingTransaction(id).subscribe(
      isSuccess => {
        this.fetchOrders();
      }
    );
  }
}
