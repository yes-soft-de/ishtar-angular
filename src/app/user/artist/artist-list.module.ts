import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ArtistListPageComponent} from './component/artist-list-page/artist-list-page.component';
import {SharedModule} from '../shared/shared.module';
import {PaintingListPageComponent} from '../painting/component/painting-list-page/painting-list-page.component';

const routes: Routes = [
  {
    path: 'artist-list',
    pathMatch: 'full',
    component: ArtistListPageComponent,
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ArtistListModule {
}
