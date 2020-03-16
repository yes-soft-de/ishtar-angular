import {Component, OnInit} from '@angular/core';
import {PendingTransactionService} from '../../service/pending-transaction.service';
import {PendingTransactionListItem} from 'src/app/user/client/entity/pending-transaction-list-item';

@Component({
  selector: 'app-pending-transactions',
  templateUrl: './pending-transactions.component.html',
  styleUrls: ['./pending-transactions.component.scss']
})
export class PendingTransactionsComponent implements OnInit {

  orders: PendingTransactionListItem[];
  config: any;

  constructor(private pendingTransactionsService: PendingTransactionService) {
  }

  ngOnInit() {
    this.fetchOrders();
  }

  fetchOrders() {
    this.pendingTransactionsService.getPendingTransactions().subscribe(
      ordersList => {
        this.orders = ordersList;
        console.log(this.orders.length + ' Orders Fetched');
        this.config = {
          itemsPerPage: 5,
          currentPage: 1,
          totalItems: this.orders.length
        };
      }
    );
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }

}