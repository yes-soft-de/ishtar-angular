import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {TranslateModule} from '@ngx-translate/core';
import {AboutIshtarPageComponent} from './component/about-ishtar-page/about-ishtar-page.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', component: AboutIshtarPageComponent}
];

@NgModule({
  declarations: [
    AboutIshtarPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    TranslateModule
  ],
  exports: [
    AboutIshtarPageComponent
  ]
})
export class AboutIshtarModule {
}
