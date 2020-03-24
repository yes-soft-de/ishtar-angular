import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PaintingListComponent} from './component/painting-list/painting-list.component';
import {PaintingListPageComponent} from './component/painting-list-page/painting-list-page.component';
import {PaintingCardComponent} from './widget/painting-card/painting-card.component';
import {RouterModule, Routes} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {InteractionsModule} from '../interactions/interactions.module';
import {SharedModule} from '../shared/shared.module';
import {MDBBootstrapModule} from 'angular-bootstrap-md';

const routes: Routes = [
  {
    path: 'painting-list',
    pathMatch: 'full',
    component: PaintingListPageComponent,
  }
];

@NgModule({
  declarations: [
    PaintingListComponent,
    PaintingListPageComponent,
    PaintingCardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule,
    MDBBootstrapModule,
    InteractionsModule,
    SharedModule
  ],
  exports: [
    PaintingListComponent,
    PaintingListPageComponent,
    PaintingCardComponent,
  ]
})
export class PaintingListModule {
}
