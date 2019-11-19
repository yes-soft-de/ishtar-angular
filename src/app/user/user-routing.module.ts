import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserComponent} from './user.component';
import {HomePageComponent} from './ui/Pages/home-page/home-page.component';
import {PaintingListPageComponent} from './ui/Pages/painting-list/painting-list-page.component';
import {ArtistListPageComponent} from './ui/Pages/artist-list/artist-list-page.component';
import {ArtistDetailsPageComponent} from './ui/Pages/artist-page/artist-details-page.component';
import {ImagesByArtistPageComponent} from './ui/Pages/images-by-artist-page/images-by-artist-page.component';
import {ArtTypePageComponent} from './ui/Pages/art-type-page/art-type-page.component';
import {SearchPageComponent} from './ui/Pages/search-page/search-page.component';
import {ArtTypeListPageComponent} from './ui/Pages/art-type-list-page/art-type-list-page.component';
import {LoginPageComponent} from './ui/Pages/login-page/login-page.component';
import {TOSPageComponent} from './ui/Pages/tospage/tospage.component';
import {PrivacyPolicyComponent} from './ui/Pages/privacy-policy/privacy-policy.component';
import {AboutUsComponent} from './ui/Pages/about-us/about-us.component';
import {FAQComponent} from './ui/Pages/faq/faq.component';
import {ImprintPageComponent} from './ui/Pages/imprint-page/imprint-page.component';
import {DataProcessingPageComponent} from './ui/Pages/data-processing-page/data-processing-page.component';
import {StatueDetailPageComponent} from './ui/Pages/statue-detail-page/statue-detail-page.component';
import {StatueListPageComponent} from './ui/Pages/statue-list-page/statue-list-page.component';
import { ProfilePageComponent } from './ui/Pages/profile-page/profile-page.component';
import { AboutIshtarPageComponent } from './ui/Pages/about-ishtar-page/about-ishtar-page.component';
import {ProfileEditPageComponent} from './ui/Pages/profile-edit-page/profile-edit-page.component';
import {PaintingDetailsPageComponent} from './painting/component/painting-details-page/painting-details-page.component';


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
      {path: 'art-type/:id', component: ArtTypePageComponent},
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
      {path: 'statue/:id', component: StatueDetailPageComponent},
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
