import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './controller/app-routing.module';
// import { IconsModule, MDBBootstrapModule } from 'angular-bootstrap-md';
// import { NgxUIModule } from '@swimlane/ngx-ui';
// import { HttpClientModule } from '@angular/common/http';
// import { ParallaxModule, ParallaxConfig } from 'ngx-parallax';
// import { NgwWowModule } from 'ngx-wow';
import { UserRoutingModule } from './controller/user-routing.module';
import { AdminRoutingModule } from './controller/admin-routing.module';
import { AdminModule  } from './ui/admin/admin.module';
import { UserModule } from './ui/user/user.module';

import { AppComponent } from './ui/app/app/app.component';
import { routingComponents } from './controller/app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // MDBBootstrapModule.forRoot(),
    // NgxUIModule, IconsModule,
    // HttpClientModule,
    // ParallaxModule,
    // NgwWowModule,
    UserRoutingModule,
    AdminRoutingModule,
    AdminModule,
    UserModule
  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
