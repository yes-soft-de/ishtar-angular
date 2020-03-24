import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IconsModule, MDBBootstrapModule} from 'angular-bootstrap-md';
import {HttpClientModule} from '@angular/common/http';
import {NgwWowModule} from 'ngx-wow';
import {UserRoutingModule} from './user-routing.module';
import {UserComponent} from './user.component';
import {ToastrModule} from 'ngx-toastr';
import {CarouselModule} from 'ngx-carousel-lib';
import {ReactiveFormsModule} from '@angular/forms';
import {ParallaxModule} from 'ngx-parallax';
import {TabsModule} from 'ngx-bootstrap';
import {LoginPageComponent} from './profile/component/login-page/login-page.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {NgxJsonLdModule} from '@ngx-lite/json-ld';
import {MarkdownModule} from 'ngx-markdown';
import {TranslateModule} from '@ngx-translate/core';
import {CartComponent} from './shared/cart/cart/cart.component';
import {PendingTransactionsComponent} from './profile/component/pending-transactions/pending-transactions.component';
import {PendingTransactionPageComponent} from './profile/component/pending-transaction-page/pending-transaction-page.component';
import {ConfirmPaymentComponent} from './profile/component/confirm-payment/confirm-payment.component';
import {CancelOrderComponent} from './profile/component/cancel-order/cancel-order.component';
import {OrderImageCardComponent} from './profile/component/order-image-card/order-image-card.component';
import {SharedModule} from './shared/shared.module';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDialogModule} from '@angular/material/dialog';
import {NgxImageZoomModule} from 'ngx-image-zoom';

@NgModule({
  declarations: [
    UserComponent,
    LoginPageComponent,
    CartComponent,
    PendingTransactionsComponent,
    PendingTransactionPageComponent,
    ConfirmPaymentComponent,
    CancelOrderComponent,
    OrderImageCardComponent
  ],
  exports: [
    UserComponent,
    LoginPageComponent,
    CartComponent,
  ],
  imports: [
    CommonModule,
    MDBBootstrapModule.forRoot(),
    IconsModule,
    HttpClientModule,
    NgwWowModule,
    UserRoutingModule,
    NgxImageZoomModule,
    ToastrModule.forRoot(), CarouselModule,
    ReactiveFormsModule, ParallaxModule, TabsModule,
    MatDialogModule,
    MatStepperModule,
    NgxPaginationModule,
    NgxJsonLdModule,
    MarkdownModule.forChild(),
    TranslateModule.forChild(),

    SharedModule
  ],
  schemas: [],
  providers: []
})
export class UserModule {
}
