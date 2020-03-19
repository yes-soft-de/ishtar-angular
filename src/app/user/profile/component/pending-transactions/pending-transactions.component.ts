import {Component, OnInit} from '@angular/core';
import {PendingTransactionService} from '../../service/pending-transaction.service';
import {PendingTransactionListItem} from 'src/app/user/client/entity/pending-transaction-list-item';
import {Router} from '@angular/router';
import {UserService} from '../../../shared/user/service/user.service';
import {MatDialog} from '@angular/material';
import {LoginPageComponent} from '../../../ui/Pages/login-page/login-page.component';

@Component({
  selector: 'app-pending-transactions',
  templateUrl: './pending-transactions.component.html',
  styleUrls: ['./pending-transactions.component.scss']
})
export class PendingTransactionsComponent implements OnInit {
  orders: PendingTransactionListItem[];
  config: any;

  constructor(private pendingTransactionsService: PendingTransactionService,
              private userService: UserService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    if (this.userService.isLoggedIn()) {
      this.fetchOrders();
    } else {
      this.dialog.open(LoginPageComponent, {
        height: '100vh'
      });
    }
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
