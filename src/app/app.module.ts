import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './controller/app-routing.module';
import { AppComponent } from './ui/app/app/app.component';
import { ArtistPageComponent } from './ui/user/artist-page/artist-page.component';
import {IconsModule, MDBBootstrapModule} from 'angular-bootstrap-md';
import {NgxUIModule} from '@swimlane/ngx-ui';
import {HttpClientModule} from '@angular/common/http';
import { HomePageComponent } from './ui/user/home-page/home-page.component';
import { NotFoundComponent } from './ui/user/not-found/not-found.component';
import { PaintingComponent } from './ui/user/painting/painting.component';
import { HeaderComponent } from './ui/app/header/header.component';
import { FooterComponent } from './ui/app/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    ArtistPageComponent,
    HomePageComponent,
    NotFoundComponent,
    PaintingComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    NgxUIModule, IconsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
