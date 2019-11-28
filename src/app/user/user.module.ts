import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IconsModule, MDBBootstrapModule} from 'angular-bootstrap-md';
import {NgxUIModule} from '@swimlane/ngx-ui';
import {HttpClientModule} from '@angular/common/http';
import {NgwWowModule} from 'ngx-wow';
import { NgxImageZoomModule } from 'ngx-image-zoom';

import {UserRoutingModule} from './user-routing.module';
import {UserComponent} from './user.component';
import {HomePageComponent} from './ui/Pages/home-page/home-page.component';
import {HomeHeaderComponent} from './ui/components/home-header/home-header.component';
// import {PaintingDetailsComponent} from './ui/components/painting-details/painting-details.component';
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
import {MatDialogModule} from '@angular/material/dialog';
import {NgxPaginationModule} from 'ngx-pagination';
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
import { LoadingWidgetComponent } from './ui/widgets/loading-widget/loading-widget.component';
import { MostSeenPaintingsComponent } from './ui/components/most-seen-paintings/most-seen-paintings.component';
import { StatuesDetailComponent } from './ui/components/statues-detail/statues-detail.component';
import { StatueDetailPageComponent } from './ui/Pages/statue-detail-page/statue-detail-page.component';
import { NgxImageZoomComponent } from './ui/widgets/ngx-image-zoom/ngx-image-zoom.component';
import { ProfilePageComponent } from './ui/Pages/profile-page/profile-page.component';
import { AboutIshtarPageComponent } from './ui/Pages/about-ishtar-page/about-ishtar-page.component';
import {ProfileEditPageComponent} from './ui/Pages/profile-edit-page/profile-edit-page.component';
import {PaintingDetailsPageComponent} from './painting/component/painting-details-page/painting-details-page.component';
import {PaintingDetailsComponent} from './painting/component/painting-details/painting-details.component';
import {PaintingMayLikeComponent} from './painting/component/painting-may-like/painting-may-like.component';
import {CommentItemComponent} from './ui/widgets/comment-item/comment-item.component';
import {PaintingCommentComponent} from './painting/component/painting-comment/painting-comment.component';
import { StatueDetailsComponent } from './statue/component/statue-details/statue-details.component';
import { StatueCommentComponent } from './statue/component/statue-comment/statue-comment.component';
import { StatueDetailsPageComponent } from './statue/component/statue-details-page/statue-details-page.component';
import { ArtistCommentComponent } from './artist/component/artist-comment/artist-comment.component';
import { LoveComponent } from './shared/interaction-love/component/love/love.component';
import {HeaderComponent} from './shared/header/header.component';
import {FooterComponent} from './shared/footer/footer.component';
import {ArtistListPageComponent} from './artist/component/artist-list-page/artist-list-page.component';
import {ArtistDetailsPageComponent} from './artist/component/artist-details-page/artist-details-page.component';
import {ArtistDetailsComponent} from './artist/component/artist-details/artist-details.component';
import {ArtistPaintingsComponent} from './artist/component/artist-paintings/artist-paintings.component';
import {ArtistListComponent} from './artist/component/artist-list/artist-list.component';
import {StatueListPageComponent} from './statue/component/statue-list-page/statue-list-page.component';
import {StatueListComponent} from './statue/component/statue-list/statue-list.component';
import {InteractionComponent} from './interactions/component/interaction/interaction.component';
import {PaintingListComponent} from './painting/component/painting-list/painting-list.component';
import {PaintingListPageComponent} from './painting/component/painting-list-page/painting-list-page.component';
import { FollowComponent } from './shared/interaction-follow/component/follow/follow.component';
import { ClapComponent } from './shared/interaction-clap/component/clap/clap.component';


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
    PaintingMayLikeComponent,
    ImagesByArtistPageComponent,
    ArtTypePageComponent,
    ProfileEditPageComponent,
    // Components
    ArtistListComponent,
    ArtistDetailsComponent,
    HomeHeaderComponent,
    PaintingDetailsComponent,
    PaintingListComponent,
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
    DataProcessingPageComponent,
    LoadingWidgetComponent,
    MostSeenPaintingsComponent,
    StatuesDetailComponent,
    StatueDetailPageComponent,
    NgxImageZoomComponent,
    StatueListComponent,
    StatueListPageComponent,
    ProfilePageComponent,
    AboutIshtarPageComponent,
    CommentItemComponent,
    PaintingCommentComponent,
    StatueDetailsComponent,
    StatueCommentComponent,
    StatueDetailsPageComponent,
    ArtistCommentComponent,
    LoveComponent,
    ArtistDetailsComponent,
    ArtistPaintingsComponent,
    InteractionComponent,
    StatueListComponent,
    FollowComponent,
    ClapComponent
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
    PaintingMayLikeComponent,
    ImagesByArtistPageComponent,
    ProfileEditPageComponent,
    // Components
    ArtistListComponent,
    ArtistDetailsComponent,
    ArtistPaintingsComponent,
    HomeHeaderComponent,
    PaintingDetailsComponent,
    PaintingListComponent,
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
    NgxImageZoomModule.forRoot()
  ], schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class UserModule {
}
