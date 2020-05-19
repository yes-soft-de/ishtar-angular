import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProfileComponent} from './profile.component';
import {SharedModule} from '../shared/shared.module';
import {PendingTransactionsComponent} from './component/pending-transactions/pending-transactions.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {OrderImageCardComponent} from './component/order-image-card/order-image-card.component';
import {PendingTransactionPageComponent} from './component/pending-transaction-page/pending-transaction-page.component';
import {ConfirmPaymentComponent} from './component/confirm-payment/confirm-payment.component';
import {CancelOrderComponent} from './component/cancel-order/cancel-order.component';
import {RouterModule} from '@angular/router';
import {PaintingModule} from '../painting/painting.module';


@NgModule({
  declarations: [
    ProfileComponent,
    PendingTransactionsComponent,
    PendingTransactionPageComponent,
    OrderImageCardComponent,
    ConfirmPaymentComponent,
    CancelOrderComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    PaintingModule,
    NgxPaginationModule
  ],
  exports: [
    ProfileComponent,
    PendingTransactionPageComponent,
    PendingTransactionsComponent
  ]
})
export class ProfileModule {
}
