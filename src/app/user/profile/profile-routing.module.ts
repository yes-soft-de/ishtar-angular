import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {LoginPageComponent} from './component/login-page/login-page.component';
import {PendingTransactionsComponent} from './component/pending-transactions/pending-transactions.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent
  }, {
    path: 'pending-transactions',
    component: PendingTransactionsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {
}
