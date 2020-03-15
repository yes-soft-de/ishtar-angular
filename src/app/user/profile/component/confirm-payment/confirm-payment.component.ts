import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../shared/user/service/user.service';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material';
import {LoginPageComponent} from '../../../ui/Pages/login-page/login-page.component';
import {PendingTransactionService} from '../../service/pending-transaction.service';

@Component({
  selector: 'app-confirm-payment',
  templateUrl: './confirm-payment.component.html',
  styleUrls: ['./confirm-payment.component.scss']
})
export class ConfirmPaymentComponent implements OnInit {
  orderId: string;

  paymentId: string;
  token: string;
  PayerID: string;

  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private pendingTransactionService: PendingTransactionService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      params => {
        this.paymentId = params.get('paymentId');
        this.token = params.get('token');
        this.PayerID = params.get('PayerID');
        if (this.userService.isLoggedIn()) {
          this.activatedRoute.queryParams.subscribe(
            queries => {
              console.log('the Queries are: ' + JSON.stringify(queries));
              this.submitOrderConfirmation();
            }
          );
        } else {
          this.dialog.open(LoginPageComponent,
            {
              height: '80vh'
            });
        }
      }
    );
  }

  submitOrderConfirmation() {
    this.pendingTransactionService.confirmPayment(this.orderId, {
      paymentId: this.paymentId,
      token: this.token,
      PayerID: this.PayerID
    }).subscribe(
      () => {
        console.log('Successfully Confirmed Order');
      }
    );
  }
}
