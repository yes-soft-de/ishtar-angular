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
import {SearchPageComponent} from './ui/Pages/search-page/search-page.component';
import {ArtTypeListPageComponent} from './ui/Pages/art-type-list-page/art-type-list-page.component';
import {LoginPageComponent} from './ui/Pages/login-page/login-page.component';


const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {path: '', component: HomePageComponent, data: {index: 0}},
      {path: 'search/:query', component: SearchPageComponent},
      {path: 'artist-list', component: ArtistListPageComponent, data: {index: 1}},
      {path: 'painting-list', component: PaintingListPageComponent},
      {path: 'painting-list-by-name/:id', component: ImagesByArtistPageComponent},
      {path: 'art-type/:id', component: ArtTypePageComponent},
      {path: 'painting/:id', component: PaintingDetailsPageComponent},
      {path: 'artist/:id', component: ArtistDetailsPageComponent},
      {path: 'art-schools-list', component: ArtTypeListPageComponent},
      {path: 'login', component: LoginPageComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
