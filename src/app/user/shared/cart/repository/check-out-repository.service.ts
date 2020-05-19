import { Injectable } from '@angular/core';
import { IshtarClientService } from '../../client/ishtar-client.service';
import { Observable } from 'rxjs';
import { PaymentResponse } from '../entity/payment-response';
import { PaymentRequest } from '../entity/payment-request';
import {UserConfig} from '../../../UserConfig';

@Injectable({
  providedIn: 'root'
})
export class CheckOutRepositoryService {

  constructor(private httpClient: IshtarClientService) {
  }

  submitPayment(paymentData: PaymentRequest): Observable<PaymentResponse> {
    return this.httpClient.post(`${UserConfig.PaymentAPI}`, JSON.stringify(paymentData));
  }
}
