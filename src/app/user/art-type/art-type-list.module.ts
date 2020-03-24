import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ArtTypeListComponent} from './component/art-type-list/art-type-list.component';
import {ArtTypeListPageComponent} from './component/art-type-list-page/art-type-list-page.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../shared/shared.module';

const routes: Routes = [
  {
    path: 'art-type-list',
    pathMatch: 'full',
    component: ArtTypeListPageComponent
  }
];

@NgModule({
  declarations: [
    ArtTypeListComponent,
    ArtTypeListPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: [
    ArtTypeListComponent,
    ArtTypeListPageComponent,
  ]
})
export class ArtTypeListModule {
}
