import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PaintingListPageComponent} from './component/painting-list-page/painting-list-page.component';
import {PaintingDetailsPageComponent} from './component/painting-details-page/painting-details-page.component';

const routes: Routes = [
  {path: '', component: PaintingListPageComponent},
  {path: ':id', component: PaintingDetailsPageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaintingRoutingModule {
}
