import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule, routingComponents} from './controller/app-routing.module';
import {AppComponent} from './app/app.component';
import {IconsModule, MDBBootstrapModule} from 'angular-bootstrap-md';
import {NgxUIModule} from '@swimlane/ngx-ui';
import {HttpClientModule} from '@angular/common/http';
import {ParallaxModule, ParallaxConfig} from 'ngx-parallax';
import {NgwWowModule} from 'ngx-wow';
import {TabsModule} from 'ngx-bootstrap';
import {UserModule} from './user/user.module';
import {AdminModule} from './admin/admin.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
<<<<<<< Updated upstream
import { ImagesByArtistPageComponent } from './user/ui/Pages/images-by-artist-page/images-by-artist-page.component';
import {CloudinaryModule} from '@cloudinary/angular-5.x';
import {Cloudinary} from 'cloudinary-core';
=======
>>>>>>> Stashed changes

@NgModule({
  declarations: [
    AppComponent,
    routingComponents
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    NgxUIModule,
    IconsModule,
    HttpClientModule,
    ParallaxModule,
    NgwWowModule,
    TabsModule.forRoot(),
    UserModule,
    AdminModule,
    CloudinaryModule.forRoot(Cloudinary, { cloud_name: 'micksawy3r'}),
  ],
  providers: [],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
