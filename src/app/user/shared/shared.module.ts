import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {LoveComponent} from './interaction-love/component/love/love.component';
import {FollowComponent} from './interaction-follow/component/follow/follow.component';
import {ClapComponent} from './interaction-clap/component/clap/clap.component';
import {ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {RouterModule} from '@angular/router';
import {InteractionsModule} from '../interactions/interactions.module';
import {NotFoundComponent} from './not-found/not-found.component';
import {CartComponent} from './cart/cart/cart.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CartComponent,
    NotFoundComponent,
    LoveComponent,
    FollowComponent,
    ClapComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    MDBBootstrapModule,
    RouterModule,
    InteractionsModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    CartComponent,
    NotFoundComponent,
    LoveComponent,
    FollowComponent,
    ClapComponent,
  ]
})
export class SharedModule { }
