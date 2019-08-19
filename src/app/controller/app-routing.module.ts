import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomePageComponent} from '../ui/user/home-page/home-page.component';
import {NotFoundComponent} from '../ui/user/not-found/not-found.component';
import {PaintingComponent} from '../ui/user/painting/painting.component';
import {ArtistPageComponent} from '../ui/user/artist-page/artist-page.component';
import {PaintingListComponent} from '../ui/user/painting-list/painting-list.component';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'artist/:id', component: ArtistPageComponent},
  {path: 'painting/:id', component: PaintingComponent},
  {path: 'painting-list', component: PaintingListComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

export const routingComponents = [PaintingComponent, ArtistPageComponent, NotFoundComponent];
