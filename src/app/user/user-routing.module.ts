import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserComponent} from './user.component';
import {HomePageComponent} from './ui/Pages/home-page/home-page.component';
import {PaintingListPageComponent} from './ui/Pages/painting-list/painting-list-page.component';
import {ArtistListPageComponent} from './ui/Pages/artist-list/artist-list-page.component';
import {PaintingDetailsPageComponent} from './ui/Pages/painting/painting-details-page.component';
import {ArtistDetailsPageComponent} from './ui/Pages/artist-page/artist-details-page.component';
import {ImagesByArtistPageComponent} from './ui/Pages/images-by-artist-page/images-by-artist-page.component';
import {ArtTypePageComponent} from './ui/Pages/art-type-page/art-type-page.component';


const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {path: '', component: HomePageComponent},
      {path: 'artist-list', component: ArtistListPageComponent},
      {path: 'painting-list', component: PaintingListPageComponent},
      {path: 'painting-list-by-name/:id', component: ImagesByArtistPageComponent},
      {path: 'art-type/:id', component: ArtTypePageComponent},
      {path: 'painting/:id', component: PaintingDetailsPageComponent},
      {path: 'artist/:id', component: ArtistDetailsPageComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
