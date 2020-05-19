import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {LoginPageComponent} from './component/login-page/login-page.component';
import {PendingTransactionsComponent} from './component/pending-transactions/pending-transactions.component';
import {ConfirmPaymentComponent} from './component/confirm-payment/confirm-payment.component';
import {CancelOrderComponent} from './component/cancel-order/cancel-order.component';
import {ProfileModule} from './profile.module';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'pending-transactions',
    component: PendingTransactionsComponent
  },
  {
    path: 'successorder',
    component: ConfirmPaymentComponent
  },
  {
    path: 'canceledorder',
    component: CancelOrderComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    ProfileModule
  ],
  exports: [RouterModule]
})
export class ProfileRoutingModule {
}
