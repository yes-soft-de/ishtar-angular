import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './controller/app-routing.module';
import { IconsModule, MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgxUIModule } from '@swimlane/ngx-ui';
import { HttpClientModule } from '@angular/common/http';
import { ParallaxModule, ParallaxConfig } from 'ngx-parallax';
import { NgwWowModule } from 'ngx-wow';

import { AppComponent } from './ui/app/app/app.component';
import { HeaderComponent } from './ui/app/user/header/header.component';
import { FooterComponent } from './ui/app/user/footer/footer.component';
import { routingComponents } from './controller/app-routing.module';
import { AdminFooterComponent } from './ui/app/admin/admin-footer/admin-footer.component';
import { AdminHeaderComponent } from './ui/app/admin/admin-header/admin-header.component';
import { PaintingComponent } from './ui/admin/painting/painting.component';
import { ArtistComponent } from './ui/admin/artist/artist.component';
import { AuctionComponent } from './ui/admin/auction/auction.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    routingComponents,
    AdminFooterComponent,
    AdminHeaderComponent,
    PaintingComponent,
    ArtistComponent,
    AuctionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    NgxUIModule, IconsModule,
    HttpClientModule,
    ParallaxModule,
    NgwWowModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
