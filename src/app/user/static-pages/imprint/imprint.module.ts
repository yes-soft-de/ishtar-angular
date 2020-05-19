import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {RouterModule, Routes} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {ImprintPageComponent} from './component/imprint-page/imprint-page.component';

const routes: Routes = [
  {path: '', component: ImprintPageComponent}
];

@NgModule({
  declarations: [
    ImprintPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    TranslateModule
  ],
  exports: [
    ImprintPageComponent
  ]
})
export class ImprintModule { }
