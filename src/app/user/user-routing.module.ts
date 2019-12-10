import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserComponent} from './user.component';
import {ImagesByArtistPageComponent} from './ui/Pages/images-by-artist-page/images-by-artist-page.component';
import {LoginPageComponent} from './ui/Pages/login-page/login-page.component';
import {TOSPageComponent} from './static-pages/tospage/tospage.component';
import {PrivacyPolicyComponent} from './static-pages/privacy-policy/privacy-policy.component';
import {AboutUsComponent} from './static-pages/about-us/about-us.component';
import {FAQComponent} from './static-pages/faq/faq.component';
import {ImprintPageComponent} from './static-pages/imprint-page/imprint-page.component';
import {DataProcessingPageComponent} from './static-pages/data-processing-page/data-processing-page.component';
import {ProfilePageComponent} from './ui/Pages/profile-page/profile-page.component';
import {AboutIshtarPageComponent} from './static-pages/about-ishtar-page/about-ishtar-page.component';
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


const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {path: '', component: HomePageComponent},
      {path: 'search/:query', component: SearchPageComponent},
      {path: 'artist-list', component: ArtistListPageComponent},
      {path: 'painting-list', component: PaintingListPageComponent},
      {path: 'painting-by-name/:id', component: ImagesByArtistPageComponent},
      {path: 'art-type/:id', component: ArtTypeDetailsPageComponent},
      {path: 'artist/:id', component: ArtistDetailsPageComponent},
      {path: 'art-schools-list', component: ArtTypeListPageComponent},
      {path: 'login', component: LoginPageComponent},
      {path: 'tos', component: TOSPageComponent},
      {path: 'privacy', component: PrivacyPolicyComponent},
      {path: 'about-us', component: AboutUsComponent},
      {path: 'faq', component: FAQComponent},
      {path: 'imprint', component: ImprintPageComponent},
      {path: 'data-processing', component: DataProcessingPageComponent},
      {path: 'statue-list', component: StatueListPageComponent},
      {path: 'statue/:id', component: StatueDetailsPageComponent},
      {path: 'profile', component: ProfilePageComponent},
      {path: 'edit-profile', component: ProfileEditPageComponent},
      {path: 'about-ishtar', component: AboutIshtarPageComponent},
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
