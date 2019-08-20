import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconsModule, MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgxUIModule } from '@swimlane/ngx-ui';
import { HttpClientModule } from '@angular/common/http';
import { ParallaxModule, ParallaxConfig } from 'ngx-parallax';
import { NgwWowModule } from 'ngx-wow';

import { UserRoutingModule } from '../../controller/user-routing.module';
import {UserComponent} from './user.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PaintingComponent } from './painting/painting.component';
import { ArtistPageComponent } from './artist-page/artist-page.component';
import {FooterComponent} from '../app/user/footer/footer.component';
import {HeaderComponent} from '../app/user/header/header.component';


@NgModule({
  declarations: [
    UserComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    PaintingComponent,
    ArtistPageComponent
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
    UserRoutingModule
  ]
})
export class UserModule { }
