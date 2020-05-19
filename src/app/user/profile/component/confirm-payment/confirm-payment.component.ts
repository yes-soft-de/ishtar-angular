import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../shared/user-services/service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {LoginPageComponent} from '../login-page/login-page.component';
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
              private router: Router,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    if (this.userService.isLoggedIn()) {
      this.activatedRoute.queryParams.subscribe(
        queries => {
          this.paymentId = queries.paymentId;
          console.log('PAYMENT: ' + this.paymentId);
          this.token = queries.token;
          console.log('PAYMENT: ' + this.token);
          this.PayerID = queries.PayerID;
          console.log('PAYMENT: ' + this.PayerID);
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

  submitOrderConfirmation() {
    this.pendingTransactionService.confirmPayment(this.orderId, {
      paymentId: this.paymentId,
      token: this.token,
      PayerID: this.PayerID
    }).subscribe(
      () => {
        console.log('Successfully Confirmed Order');
        this.router.navigate(['/pending-transactions']);
      }
    );
  }
}
