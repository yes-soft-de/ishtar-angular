import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app/app.component';
import {IconsModule, MDBBootstrapModule} from 'angular-bootstrap-md';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {NgwWowModule} from 'ngx-wow';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CookieService} from 'ngx-cookie-service';
import {NgxJsonLdModule} from '@ngx-lite/json-ld';
import {MarkdownModule} from 'ngx-markdown';
import {registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import localeFrExtra from '@angular/common/locales/extra/fr';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {NgxImageZoomModule} from 'ngx-image-zoom';
import {QuicklinkModule} from 'ngx-quicklink';
import {MatDialogModule} from '@angular/material/dialog';
import {ToastrModule} from 'ngx-toastr';
import {ArtTypeModule} from './user/art-type/art-type.module';
import {ArtistModule} from './user/artist/artist.module';
import {PaintingRoutingModule} from './user/painting/painting-routing.module';
import {ProfileModule} from './user/profile/profile.module';
import {SearchModule} from './user/search/search.module';
import {AboutIshtarModule} from './user/static-pages/about-ishtar/about-ishtar.module';
import {AboutUsModule} from './user/static-pages/about-us/about-us.module';
import {ContactSupportModule} from './user/static-pages/contact-support/contact-support.module';
import {DataProcessingModule} from './user/static-pages/data-processing/data-processing.module';
import {FaqModule} from './user/static-pages/faq/faq.module';
import {ImprintModule} from './user/static-pages/imprint/imprint.module';
import {PrivacyPolicyModule} from './user/static-pages/privacy-policy/privacy-policy.module';
import {TosModule} from './user/static-pages/tos/tos.module';
import {StatueModule} from './user/statue/statue.module';
import {HomeModule} from './user/home/home.module';
import {NgxGoogleAnalyticsModule, NgxGoogleAnalyticsRouterModule} from 'ngx-google-analytics';

registerLocaleData(localeFr, 'fr-FR', localeFrExtra);

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
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
    MatDialogModule,
    ToastrModule.forRoot(),
    MarkdownModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NgxGoogleAnalyticsModule.forRoot('UA-142190160-2'),
    NgxGoogleAnalyticsRouterModule,
    // User Pages Modules
    ArtTypeModule,
    ArtistModule,
    PaintingRoutingModule,
    ProfileModule,
    SearchModule,
    AboutIshtarModule,
    AboutUsModule,
    ContactSupportModule,
    DataProcessingModule,
    FaqModule,
    ImprintModule,
    PrivacyPolicyModule,
    TosModule,
    StatueModule,
    HomeModule
  ],
  providers: [CookieService],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
