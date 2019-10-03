import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IconsModule, MDBBootstrapModule} from 'angular-bootstrap-md';
import {NgxUIModule} from '@swimlane/ngx-ui';
import {HttpClientModule} from '@angular/common/http';
import {NgwWowModule} from 'ngx-wow';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {UserRoutingModule} from './user-routing.module';
import {UserComponent} from './user.component';
import {HomePageComponent} from './ui/Pages/home-page/home-page.component';
import {FooterComponent} from './ui/components/general-footer/footer.component';
import {HeaderComponent} from './ui/components/general-header/header.component';
import {PaintingListPageComponent} from './ui/Pages/painting-list/painting-list-page.component';
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
import {SchoolListComponent} from './ui/components/school-art-list/school-list.component';
import {ToastrModule} from 'ngx-toastr';
import {CarouselModule} from 'ngx-carousel-lib';
import {ImagesByArtistPageComponent} from './ui/Pages/images-by-artist-page/images-by-artist-page.component';
import {ArtTypePageComponent} from './ui/Pages/art-type-page/art-type-page.component';
import {ArtTypeComponent} from './ui/components/art-type/art-type.component';
import {CommentsComponent} from './ui/components/comments/comments.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ParallaxModule} from 'ngx-parallax';
import {HomeAuctionSectionComponent} from './ui/components/home-auction-section/home-auction-section.component';
import {HomeNavbarComponent} from './ui/components/home-navbar/home-navbar.component';
import {SearchPageComponent} from './ui/Pages/search-page/search-page.component';
import {SearchListComponent} from './ui/components/search-list/search-list.component';
import {ArtTypeListPageComponent} from './ui/Pages/art-type-list-page/art-type-list-page.component';
import {TabsModule} from 'ngx-bootstrap';
import {LoginPageComponent} from './ui/Pages/login-page/login-page.component';
import {MatDialogModule} from '@angular/material';
import {NgxPaginationModule} from 'ngx-pagination';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {ClapWidgetComponent} from './ui/widgets/clap-widget/clap-widget.component';
import {FollowWidgetComponent} from './ui/widgets/follow-widget/follow-widget.component';
import {LoveWidgetComponent} from './ui/widgets/love-interaction/love-widget.component';
import {DataProcessingPageComponent} from './ui/Pages/data-processing-page/data-processing-page.component';
import {ImprintPageComponent} from './ui/Pages/imprint-page/imprint-page.component';
import {FAQComponent} from './ui/Pages/faq/faq.component';
import {AboutUsComponent} from './ui/Pages/about-us/about-us.component';
import {ContactSupportComponent} from './ui/Pages/contact-support/contact-support.component';
import {PrivacyPolicyComponent} from './ui/Pages/privacy-policy/privacy-policy.component';
import {TOSPageComponent} from './ui/Pages/tospage/tospage.component';

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
    CommentsComponent,
    HomeAuctionSectionComponent,
    HomeNavbarComponent,
    SearchPageComponent,
    SearchListComponent,
    ArtTypeListPageComponent,
    LoginPageComponent,
    ClapWidgetComponent,
    LoveWidgetComponent,
    FollowWidgetComponent,
    TOSPageComponent,
    PrivacyPolicyComponent,
    ContactSupportComponent,
    AboutUsComponent,
    FAQComponent,
    ImprintPageComponent,
    DataProcessingPageComponent
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
    CommentsComponent,
    SearchPageComponent,
    SearchListComponent,

    ArtTypeListPageComponent,
    LoginPageComponent,
    ClapWidgetComponent,
    LoveWidgetComponent,
    FollowWidgetComponent,
    TOSPageComponent,
    PrivacyPolicyComponent,
    ContactSupportComponent,
    AboutUsComponent,
    FAQComponent,
    ImprintPageComponent,
    DataProcessingPageComponent

  ],
  imports: [
    CommonModule,
    MDBBootstrapModule.forRoot(),
    NgxUIModule, IconsModule,
    HttpClientModule,
    NgwWowModule,
    UserRoutingModule,
    ToastrModule.forRoot(), CarouselModule,
    ReactiveFormsModule, ParallaxModule, TabsModule,
    MatDialogModule,
    NgxPaginationModule,
    // BrowserAnimationsModule,
    Ng2SearchPipeModule
  ]
})
export class UserModule {
}
