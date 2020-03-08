import { Injectable } from '@angular/core';
import { IshtarClientService } from '../../client/ishtar-client.service';
import { Observable } from 'rxjs';
import { AdminConfig } from 'src/app/admin/AdminConfig';
import { PaymentResponse } from '../entity/payment-response';
import { PaymentRequest } from '../entity/payment-request';

@Injectable({
  providedIn: 'root'
})
export class CheckOutRepositoryService {

  constructor(private httpClient: IshtarClientService) {
  }

  submitPayment(paymentData: PaymentRequest): Observable<PaymentResponse> {
    return this.httpClient.post(`${AdminConfig.PaymentAPI}`, JSON.stringify(paymentData));
  }
}
