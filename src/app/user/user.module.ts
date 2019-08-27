import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IconsModule, MDBBootstrapModule} from 'angular-bootstrap-md';
import {NgxUIModule} from '@swimlane/ngx-ui';
import {HttpClientModule} from '@angular/common/http';
import {ParallaxModule} from 'ngx-parallax';
import {NgwWowModule} from 'ngx-wow';

import {UserRoutingModule} from './user-routing.module';
import {UserComponent} from './user.component';
import {HomePageComponent} from './ui/Pages/home-page/home-page.component';
import {FooterComponent} from './ui/components/general-footer/footer.component';
import {HeaderComponent} from './ui/components/general-header/header.component';
import {PaintingListPageComponent} from './ui/Pages/painting-list/painting-list-page.component';
import {TabsModule} from 'ngx-bootstrap';
import {ArtistListComponent} from './ui/components/artist-list/artist-list.component';
import {HomeHeaderComponent} from './ui/components/home-header/home-header.component';
import {PaintingListComponent} from './ui/components/painting-list/painting-list.component';
import {PaintingDetailsComponent} from './ui/components/painting-details/painting-details.component';
import {ArtistListPageComponent} from './ui/Pages/artist-list/artist-list-page.component';
import {ArtistDetailsPageComponent} from './ui/Pages/artist-page/artist-details-page.component';
import {ArtistDetailsComponent} from './ui/components/artist-details/artist-details.component';
import {PaintingDetailsPageComponent} from './ui/Pages/painting/painting-details-page.component';
import {AlternatingListComponent} from './ui/components/alternating-list/alternating-list.component';
import {ItemBriefComponent} from './ui/components/item-brief/item-brief.component';
import {SchoolListComponent} from './ui/components/grid-list/school-list.component';

@NgModule({
  declarations: [
    // User
    UserComponent,
    // General
    HeaderComponent,
    FooterComponent,
    // Pages
    ArtistListPageComponent,
    ArtistDetailsPageComponent,
    HomePageComponent,
    PaintingListPageComponent,
    PaintingDetailsPageComponent,
    // Components
    ArtistListComponent,
    ArtistDetailsComponent,
    HomeHeaderComponent,
    PaintingDetailsComponent,
    PaintingListComponent,
    AlternatingListComponent,
    SchoolListComponent,
    ItemBriefComponent
  ],
  exports: [
    // User
    UserComponent,
    // General
    HeaderComponent,
    FooterComponent,
    // Pages
    ArtistListPageComponent,
    ArtistDetailsPageComponent,
    HomePageComponent,
    PaintingListPageComponent,
    PaintingDetailsPageComponent,
    // Components
    ArtistListComponent,
    ArtistDetailsComponent,
    HomeHeaderComponent,
    PaintingDetailsComponent,
    PaintingListComponent,
    AlternatingListComponent,
    SchoolListComponent,
    ItemBriefComponent
  ],
  imports: [
    CommonModule,
    MDBBootstrapModule.forRoot(),
    NgxUIModule, IconsModule,
    HttpClientModule,
    ParallaxModule,
    NgwWowModule,
    UserRoutingModule,
    TabsModule.forRoot()
  ]
})
export class UserModule {
}
