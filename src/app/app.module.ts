import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule, routingComponents} from './controller/app-routing.module';
import {AppComponent} from './ui/app/app/app.component';
import {IconsModule, MDBBootstrapModule} from 'angular-bootstrap-md';
import {NgxUIModule} from '@swimlane/ngx-ui';
import {HttpClientModule} from '@angular/common/http';
import {ParallaxModule, ParallaxConfig} from 'ngx-parallax';
import {NgwWowModule} from 'ngx-wow';
import {TabsModule} from 'ngx-bootstrap';
import {UploadModule} from './upload/upload.module';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    NgxUIModule,
    IconsModule,
    HttpClientModule,
    ParallaxModule,
    NgwWowModule,
    TabsModule.forRoot(),
    UploadModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
