import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProfileRoutingModule} from './profile-routing.module';
import {ProfileComponent} from './profile.component';
import {SharedModule} from '../shared/shared.module';
import {PaintingModule} from '../painting/painting.module';
import {PendingTransactionsComponent} from './component/pending-transactions/pending-transactions.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {OrderImageCardComponent} from './component/order-image-card/order-image-card.component';
import {PendingTransactionPageComponent} from './component/pending-transaction-page/pending-transaction-page.component';


@NgModule({
  declarations: [
    ProfileComponent,
    PendingTransactionsComponent,
    PendingTransactionPageComponent,
    OrderImageCardComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
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
