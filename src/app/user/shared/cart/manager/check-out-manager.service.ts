import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CheckOutRepositoryService } from '../repository/check-out-repository.service';
import {PaymentResponse } from '../entity/payment-response';
import { PaymentRequest } from '../entity/payment-request';

@Injectable({
  providedIn: 'root'
})
export class CheckOutManagerService {

  constructor(private checkoutService: CheckOutRepositoryService) { }

  submitPayment(paymentData: PaymentRequest): Observable<PaymentResponse> {
    return this.checkoutService.submitPayment(paymentData);
  }
}
