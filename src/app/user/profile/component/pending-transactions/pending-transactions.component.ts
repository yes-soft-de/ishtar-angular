import {Component, OnInit} from '@angular/core';
import {PendingTransationService} from '../../service/pending-transation.service';
import {PendingTransactionListItem} from 'src/app/user/client/entity/pending-transaction-list-item';

@Component({
  selector: 'app-pending-transactions',
  templateUrl: './pending-transactions.component.html',
  styleUrls: ['./pending-transactions.component.scss']
})
export class PendingTransactionsComponent implements OnInit {

  orders: PendingTransactionListItem[];
  config: any;

  constructor(private pendingTransactionsService: PendingTransationService) {
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

  cancelOrder(id: number) {
    this.pendingTransactionsService.cancelPendingTransaction(`${id}`).subscribe(
      () => {
        this.fetchOrders();
      }
    );
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }

}
