import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ArtistListPageComponent} from './component/artist-list-page/artist-list-page.component';
import {ArtistDetailsPageComponent} from './component/artist-details-page/artist-details-page.component';

const routes: Routes = [
  {path: '', component: ArtistListPageComponent},
  {path: ':id', component: ArtistDetailsPageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaintingRoutingModule {
}
