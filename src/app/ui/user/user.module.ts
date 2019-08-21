import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IconsModule, MDBBootstrapModule} from 'angular-bootstrap-md';
import {NgxUIModule} from '@swimlane/ngx-ui';
import {HttpClientModule} from '@angular/common/http';
import {ParallaxModule, ParallaxConfig} from 'ngx-parallax';
import {NgwWowModule} from 'ngx-wow';

import {UserRoutingModule} from '../../controller/user-routing.module';
import {UserComponent} from './user.component';
import {HomePageComponent} from './home-page/home-page.component';
import {PaintingComponent} from './painting/painting.component';
import {ArtistPageComponent} from './artist-page/artist-page.component';
import {FooterComponent} from '../app/user/footer/footer.component';
import {HeaderComponent} from '../app/user/header/header.component';
import {PaintingListComponent} from './painting-list/painting-list.component';
import {TabsModule} from 'ngx-bootstrap';


@NgModule({
  declarations: [
    UserComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    PaintingComponent,
    ArtistPageComponent,
    PaintingListComponent
  ],
  exports: [
    UserComponent,
    HeaderComponent,
    FooterComponent
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
