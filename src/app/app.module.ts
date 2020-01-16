import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';

import {AppRoutingModule, routingComponents} from './controller/app-routing.module';
import {AppComponent} from './app/app.component';
import {IconsModule, MDBBootstrapModule} from 'angular-bootstrap-md';
import {NgxUIModule} from '@swimlane/ngx-ui';
import {HttpClientModule} from '@angular/common/http';
import {NgwWowModule} from 'ngx-wow';
import {TabsModule} from 'ngx-bootstrap';
import {UserModule} from './user/user.module';
import {AdminModule} from './admin/admin.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CookieService} from 'ngx-cookie-service';

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
    NgwWowModule,
    TabsModule.forRoot(),
    UserModule,
    AdminModule
  ],
  providers: [CookieService],
  exports: [],
  bootstrap: [AppComponent]
  // schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule {
}
