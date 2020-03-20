import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StaticPagesComponent} from './static-pages/static-pages.component';
import {TOSPageComponent} from './component/tospage/tospage.component';
import {PrivacyPolicyComponent} from './component/privacy-policy/privacy-policy.component';
import {AboutUsComponent} from './component/about-us/about-us.component';
import {FAQComponent} from './component/faq/faq.component';
import {ImprintPageComponent} from './component/imprint-page/imprint-page.component';
import {DataProcessingPageComponent} from './component/data-processing-page/data-processing-page.component';
import {AboutIshtarPageComponent} from './component/about-ishtar-page/about-ishtar-page.component';
import {ContactSupportComponent} from './component/contact-support/contact-support.component';

const routes: Routes = [
  {
    path: '', component: StaticPagesComponent, children: [
      {path: 'tos', component: TOSPageComponent},
      {path: 'privacy', component: PrivacyPolicyComponent},
      {path: 'about-us', component: AboutUsComponent},
      {path: 'faq', component: FAQComponent},
      {path: 'imprint', component: ImprintPageComponent},
      {path: 'data-processing', component: DataProcessingPageComponent},
      {path: 'about-ishtar', component: AboutIshtarPageComponent},
    ],
    runGuardsAndResolvers: 'paramsChange'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaticPagesRoutingModule {
}
