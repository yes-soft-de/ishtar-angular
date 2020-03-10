import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IshtarClientService } from 'src/app/user/shared/client/ishtar-client.service';
import { Observable } from 'rxjs';
import { AdminConfig } from '../../AdminConfig';
import { OrdersResoponse } from '../../entity/order/orders-resoponse';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private httpClient: IshtarClientService) { }

  requestOrdersList(): Observable<OrdersResoponse> {
    return this.httpClient.get(`${AdminConfig.OrdersAPI}`);
  }

}
