import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AboutIshtarPageComponent} from './component/about-ishtar-page/about-ishtar-page.component';
import {AboutUsComponent} from './component/about-us/about-us.component';
import {ContactSupportComponent} from './component/contact-support/contact-support.component';
import {DataProcessingPageComponent} from './component/data-processing-page/data-processing-page.component';
import {FAQComponent} from './component/faq/faq.component';
import {ImprintPageComponent} from './component/imprint-page/imprint-page.component';
import {PrivacyPolicyComponent} from './component/privacy-policy/privacy-policy.component';
import {TOSPageComponent} from './component/tospage/tospage.component';
import {TranslateModule} from '@ngx-translate/core';
import {StaticPagesComponent} from './static-pages/static-pages.component';
import {UserRoutingModule} from '../user-routing.module';

@NgModule({
  declarations: [
    AboutIshtarPageComponent,
    AboutUsComponent,
    ContactSupportComponent,
    DataProcessingPageComponent,
    FAQComponent,
    ImprintPageComponent,
    PrivacyPolicyComponent,
    TOSPageComponent,
    StaticPagesComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    UserRoutingModule,
  ],
  exports: [
    AboutIshtarPageComponent,
    AboutUsComponent,
    ContactSupportComponent,
    DataProcessingPageComponent,
    FAQComponent,
    ImprintPageComponent,
    PrivacyPolicyComponent,
    TOSPageComponent
  ]
})
export class StaticPagesModule {
}
