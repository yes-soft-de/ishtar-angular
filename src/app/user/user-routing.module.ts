import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserComponent} from './user.component';
import {ImagesByArtistPageComponent} from './ui/Pages/images-by-artist-page/images-by-artist-page.component';
import {LoginPageComponent} from './ui/Pages/login-page/login-page.component';
import {ProfilePageComponent} from './ui/Pages/profile-page/profile-page.component';
import {ProfileEditPageComponent} from './ui/Pages/profile-edit-page/profile-edit-page.component';
import {PaintingDetailsPageComponent} from './painting/component/painting-details-page/painting-details-page.component';
import {ArtistListPageComponent} from './artist/component/artist-list-page/artist-list-page.component';
import {ArtistDetailsPageComponent} from './artist/component/artist-details-page/artist-details-page.component';
import {StatueDetailsPageComponent} from './statue/component/statue-details-page/statue-details-page.component';
import {StatueListPageComponent} from './statue/component/statue-list-page/statue-list-page.component';
import {PaintingListPageComponent} from './painting/component/painting-list-page/painting-list-page.component';
import {HomePageComponent} from './home/component/home-page/home-page.component';
import {ArtTypeDetailsPageComponent} from './art-type/component/art-type-details-page/art-type-details-page.component';
import {ArtTypeListPageComponent} from './art-type/component/art-type-list-page/art-type-list-page.component';
import {SearchPageComponent} from './search/component/search-page/search-page.component';
import {StaticPagesModule} from './static-pages/static-pages.module';


const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {path: '', component: StaticPagesModule},
      {path: 'search/:query', component: SearchPageComponent},
      {path: 'artist-list', component: ArtistListPageComponent},
      {path: 'painting-list', component: PaintingListPageComponent},
      {path: 'painting-by-name/:id', component: ImagesByArtistPageComponent},
      {path: 'art-type/:id', component: ArtTypeDetailsPageComponent},
      {path: 'artist/:id', component: ArtistDetailsPageComponent},
      {path: 'art-schools-list', component: ArtTypeListPageComponent},
      {path: 'login', component: LoginPageComponent},
      {path: 'statue-list', component: StatueListPageComponent},
      {path: 'statue/:id', component: StatueDetailsPageComponent},
      {path: 'profile', component: ProfilePageComponent},
      {path: 'edit-profile', component: ProfileEditPageComponent},
      {path: 'painting/:id', component: PaintingDetailsPageComponent}
    ],
    runGuardsAndResolvers: 'paramsChange'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
