import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ArtTypeListComponent} from './component/art-type-list/art-type-list.component';
import {ArtTypeListPageComponent} from './component/art-type-list-page/art-type-list-page.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {ArtTypeDetailsPageComponent} from './component/art-type-details-page/art-type-details-page.component';

const routes: Routes = [
  {
    path: 'art-type-list',
    pathMatch: 'full',
    component: ArtTypeListPageComponent
  },
  {
    path: 'art-type/:id',
    pathMatch: 'full',
    component: ArtTypeDetailsPageComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
})
export class ArtTypeRoutingModule {
}
