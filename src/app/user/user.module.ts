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
import {ToastrModule} from 'ngx-toastr';
import {CarouselModule} from 'ngx-carousel-lib';
import {ImagesByArtistPageComponent} from './ui/Pages/images-by-artist-page/images-by-artist-page.component';
import {NgxBootstrapSliderModule} from 'ngx-bootstrap-slider';
import {ArtTypePageComponent} from './ui/Pages/art-type-page/art-type-page.component';
import {ArtTypeComponent} from './ui/components/art-type/art-type.component';
import {CommentsComponent} from './ui/components/comments/comments.component';
import {ReactiveFormsModule} from '@angular/forms';

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
    ImagesByArtistPageComponent,
    ArtTypePageComponent,
    // Components
    ArtistListComponent,
    ArtistDetailsComponent,
    HomeHeaderComponent,
    PaintingDetailsComponent,
    PaintingListComponent,
    AlternatingListComponent,
    SchoolListComponent,
    ItemBriefComponent,
    ArtTypeComponent,
    CommentsComponent
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
    ImagesByArtistPageComponent,
    // Components
    ArtistListComponent,
    ArtistDetailsComponent,
    HomeHeaderComponent,
    PaintingDetailsComponent,
    PaintingListComponent,
    AlternatingListComponent,
    SchoolListComponent,
    ItemBriefComponent,
    CommentsComponent
  ],
  imports: [
    CommonModule,
    MDBBootstrapModule.forRoot(),
    NgxUIModule, IconsModule,
    HttpClientModule,
    ParallaxModule,
    NgwWowModule,
    UserRoutingModule,
    TabsModule.forRoot(),
    ToastrModule.forRoot(), CarouselModule,
    ReactiveFormsModule
  ]
})
export class UserModule {
}
