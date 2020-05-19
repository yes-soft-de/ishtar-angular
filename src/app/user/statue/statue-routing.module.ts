import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {StatueComponent} from './statue/statue.component';
import {StatueListPageComponent} from './component/statue-list-page/statue-list-page.component';
import {StatueDetailsPageComponent} from './component/statue-details-page/statue-details-page.component';

const routes: Routes = [
  {path: 'statue', component: StatueListPageComponent},
  {path: 'statue/:id', component: StatueDetailsPageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatueRoutingModule {
}
