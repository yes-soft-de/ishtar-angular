import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {RouterModule, Routes} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {TOSPageComponent} from './component/tospage/tospage.component';

const routes: Routes = [
  {path: '', component: TOSPageComponent}
];

@NgModule({
  declarations: [
    TOSPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    TranslateModule
  ],
  exports: [
    TOSPageComponent
  ]
})
export class TosModule { }
