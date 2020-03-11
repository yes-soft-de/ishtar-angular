import { Component, OnInit } from '@angular/core';
import { OrderListItem } from '../../../entity/order/order-list-item';
import { OrdersService } from 'src/app/admin/service/orders/orders.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {
  orders: OrderListItem[];

  config: any;                    // Config Variable For Pagination Configuration

  constructor(private ordersService: OrdersService) { }

  ngOnInit() {
    this.fetchOrders();
  }

  fetchOrders() {
    this.ordersService.requestOrdersList().subscribe(
      ordersResponse => {
        console.log('Orders Response: ' + JSON.stringify(ordersResponse));
        this.orders = ordersResponse.Data;
        console.log(this.orders.length + ' Orders Fetched');
        this.config = {
          itemsPerPage: 5,
          currentPage: 1,
          totalItems: this.orders.length
        };
      }
    );
  }

  // Fetch The Page Number On Page Change
  pageChanged(event) {
    this.config.currentPage = event;
  }

  processPayment(id: number) {
    this.ordersService.processPayment(id).subscribe(
      () => {
        this.fetchOrders();
      }
    );
  }
}
