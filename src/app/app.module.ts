import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';

import {AppRoutingModule, routingComponents} from './controller/app-routing.module';
import {AppComponent} from './app/app.component';
import {IconsModule, MDBBootstrapModule} from 'angular-bootstrap-md';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {NgwWowModule} from 'ngx-wow';
import {TabsModule} from 'ngx-bootstrap';
import {UserModule} from './user/user.module';
import {AdminModule} from './admin/admin.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CookieService} from 'ngx-cookie-service';
import {NgxJsonLdModule} from '@ngx-lite/json-ld';
import {MarkdownModule} from 'ngx-markdown';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import localeFrExtra from '@angular/common/locales/extra/fr';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {NotFoundComponent} from './user/static-pages/component/not-found/not-found.component';
import {NgxImageZoomModule} from 'ngx-image-zoom';
import {QuicklinkModule} from 'ngx-quicklink';

registerLocaleData(localeFr, 'fr-FR', localeFrExtra);

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    routingComponents
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    QuicklinkModule,
    NgxJsonLdModule,
    NgxImageZoomModule,
    IconsModule,
    HttpClientModule,
    NgwWowModule,
    TabsModule.forRoot(),
    UserModule,
    AdminModule,
    MarkdownModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [CookieService],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
