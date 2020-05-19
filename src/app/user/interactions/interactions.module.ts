import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {TranslateModule} from '@ngx-translate/core';
import {InteractionComponent} from './component/interaction/interaction.component';



@NgModule({
  declarations: [
    InteractionComponent,
  ],
  imports: [
    CommonModule,
    MDBBootstrapModule,
    TranslateModule
  ],
  exports: [
    InteractionComponent,
  ]
})
export class InteractionsModule { }
