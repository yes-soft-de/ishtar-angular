import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AboutUsComponent} from './component/about-us/about-us.component';
import {SharedModule} from '../../shared/shared.module';
import {TranslateModule} from '@ngx-translate/core';

const routes: Routes = [
  {path: '', component: AboutUsComponent}
];

@NgModule({
  declarations: [
    AboutUsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    TranslateModule
  ],
  exports: [
    AboutUsComponent
  ]
})
export class AboutUsModule { }
