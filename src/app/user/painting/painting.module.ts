import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PaintingDetailsPageComponent} from './component/painting-details-page/painting-details-page.component';
import {RouterModule, Routes} from '@angular/router';
import {PaintingListPageComponent} from './component/painting-list-page/painting-list-page.component';
import {PaintingSharedModule} from './painting-shared.module';

const routes: Routes = [
  {
    path: ':id',
    pathMatch: 'full',
    component: PaintingDetailsPageComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    component: PaintingListPageComponent,
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PaintingSharedModule
  ]
})
export class PaintingModule {
}
